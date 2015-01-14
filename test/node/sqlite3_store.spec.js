var expect = require('chai').expect;
var persistence = require('../../lib/persistence').createPersistence();
var persistenceStore = require('../../lib/persistence.store.sqlite3');

var dbPath = __dirname + '/test-sqlite3.db';
persistenceStore.config(persistence, dbPath);

var Task = persistence.define('Task', {
  username: 'TEXT'
});

var data = {
  username: 'test'
};

var data2 = {
  username: 'test2'
};

var task, task2, session;

// remove test database
function removeDb() {
  try {
    require('fs').unlinkSync(dbPath);
  } catch (err) {
  }
}

describe("The Sqlite3 Data Store", function() {
  before(function(done) {
    removeDb();
    session = persistenceStore.getSession(function () {
      session.schemaSync(function(res, err) {
        done(err);
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
