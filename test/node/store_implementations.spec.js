var expect = require('chai').expect;

/**
 * The store-implementation configurators
 */
var implementations = [
    require('./store_impl/memory'),
    require('./store_impl/sqlite3'),
    // sqlite - The sqlite package uses node-waf to build, which has been deprecated.
    //          The sqlite package appears to not be maintained, so these tests will be ignored.
    // TODO: test other store providers (appengine, cordovasql, mysql, titanium, websql)
]

/**
 * A common test fixture for each of the implementations
 */
for (var key in implementations) {
    var impl = implementations[key];
    var persistence = impl.configure();
    var Task = persistence.define('Task', {
        username: 'TEXT'
    });
    var data = { username: 'test' };
    var data2 = { username: 'test2' };
    var task, task2, session;

    describe("The " + impl.name + " Data Store", function() {
        before(function() {
            return impl.makeSession().then(function (sess) {
                session = sess;
            });
        });
        after(function() {
            return impl.cleanup();
        })

        it("can add entities to persistence", function(done) {
            task = new Task(session, data);
            session.add(task);
            session.flush(function(result, err) {
                expect(err).to.not.be.ok;
                done();
            });
        });

        it("can retrieve entities from persistence", function(done) {
            Task.findBy(session, 'id', task.id, function(task) {
                expect(task.username).to.equal(data.username);
                done();
            });
        });

        it("can update entities in persistence", function(done) {
            task.username = 'test2';
            Task.findBy(session, 'id', task.id, function(task) {
                expect(task.username).to.equal('test2');
                done();
            });
        });

        it("can remove entities from persistence", function(done) {
            session.remove(task);
            session.flush(function(result, err) {
                expect(err).to.not.be.ok;
                Task.findBy(session, 'id', task.id, function(task) {
                    expect(task).to.be.null;
                    done();
                });
            });
        });

        it("can add multiple entities to persistence", function(done) {
            task = new Task(session, data);
            session.add(task);
            task2 = new Task(session, data2);
            session.add(task2);
            session.flush(function(result, err) {
                expect(err).to.not.be.ok;
                var count = 0;
                Task.all(session).order('username', true).each(function(row) {
                    count++;
                    if (count == 1) {
                        expect(row.username).to.equal(data.username);
                    }
                    if (count == 2) {
                        expect(row.username).to.equal(data2.username);
                        done();
                    }
                });
            });
        });
    });
}


