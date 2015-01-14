var expect = require('chai').expect;
var persistence = require('../../lib/persistence').createPersistence();
var persistenceStore = require('../../lib/persistence.store.memory');
persistenceStore.config(persistence);

var Task = persistence.define('Task', {
  username: 'TEXT'
});
var data = { username: 'test' };
var task, session;

describe("The In-Memory Data Store", function() {
  before(function(done) {
    persistence.schemaSync();
    session = persistenceStore.getSession();
    done();
  });

  after(function(done) {
    session.close();
    done();
  });

  it("can add entities to the data store", function(done) {
    task = new Task(data);
    session.add(task);
    session.flush(function(result, err) {
      expect(err).to.not.be.ok;
      done();
    });
  });

  it("can retrieve an entity from the data store", function(done) {
    Task.findBy(session, 'id', task.id, function(task) {
      expect(task.username).to.equal(data.username);
      done();
    });
  });

  it("can update an entity in the data store", function(done) {
    task.username = 'test2';
    Task.findBy(session, 'id', task.id, function(task) {
      expect(task.username).to.equal('test2');
      done();
    });
  });

  it("can delete an entity from the data store", function(done) {
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
module.exports = {

};
