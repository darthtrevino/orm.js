var expect = require('chai').expect;
var persistence = require('../../lib/persistence').createPersistence();
var persistenceStore = require('../../lib/persistence.store.mysql');

var create = function(data, cb) {
  var inexistent_table = new InexistentTable(data);
  session.add(inexistent_table);
  session.flush(function(result, err) {
    cb && cb(err, inexistent_table);
  });
};

var remove = function(inexistent_table, cb) {
  session.remove(inexistent_table);
  session.flush(function(result, err) {
    cb && cb(err, result);
  });
};

var temp, session, InexistentTable;

describe('Error Handling', function() {
  before(function(done){
    persistenceStore.config(persistence, 'localhost', 3306, 'nodejs_mysql', 'test', 'test');
    InexistentTable = persistence.define('inexistent_table', {
      name: "TEXT"
    });
    session = persistenceStore.getSession();
    done();
  });

  beforeEach(function(done) {
    session.transaction(function(tx) {
      tx.executeSql('FLUSH TABLES WITH READ LOCK;', function() {
        done();
      });
    });
  });
  afterEach(function(done) {
    session.transaction(function(tx) {
      tx.executeSql('UNLOCK TABLES;', function() {
        session.close();
        done();
      });
    });
  });

  it('schemaSync emits an error', function(done) {
    session.schemaSync(function(tx, err) {
      expect(err).to.be.ok;
      done();
    });
  });

  it('create emits an error', function(done) {
    create({
      name: 'test'
    }, function(err, result) {
      expect(err).to.be.ok;
      temp = result;
      done();
    });
  });

  it('remove emits an error', function(done) {
    remove(temp, function(err, result) {
      expect(err).to.be.ok;
      done();
    });
  });

  it('destroyAll emits an error', function(done) {
    InexistentTable.all(session).destroyAll(function(result, err) {
      expect(err).to.be.ok;
      done();
    });
  });

  it('reset emits an error', function(done) {
    session.reset(function(result, err) {
      expect(err).to.be.ok;
      done();
    });
  });
});