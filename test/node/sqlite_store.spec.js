/**
 * NOTE: The sqlite package uses node-waf to build, which has been deprecated.
 * The sqlite package appears to not be maintained, so these tests will be ignored.
 */
/*
var expect = require('chai').expect;
var persistence = require('../../lib/persistence').persistence;
var persistenceStore = require('../../lib/persistence.store.sqlite');

var dbPath = __dirname + '/test.db';
persistenceStore.config(persistence, dbPath);

var Task = persistence.define('Task', {
  username: 'TEXT'
});

var data = {
  username: 'test'
};

var task, session;

// remove test database
function removeDb() {
  try {
    require('fs').unlinkSync(dbPath);
  } catch (err) {
  }
}

describe("The Sqlite Data Store", function() {
    before(function(done) {
        removeDb();
        session = persistenceStore.getSession(function () {
            session.schemaSync(function(res, err) {
                done(err)
            });
        });
    });

    after(function(done) {
        session.close(function() {
            removeDb();
            done();
        });
    });

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
});
*/