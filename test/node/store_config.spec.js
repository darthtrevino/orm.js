var persistence = require('../../lib/persistence').createPersistence();

var config;

describe('Data Store Configuration', function() {
  beforeEach(function() {
    config = {
      adaptor: '',
      database: 'test',
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: ''
    };
  });

  it('can configure a mysql store', function() {
    config.adaptor = 'mysql';
    var persistenceStore = require('../../lib/persistence.store.config').init(persistence, config);
    var session = persistenceStore.getSession();
    session.close();
  });

  it('can configure a default store', function() {
    var persistenceStore = require('../../lib/persistence.store.config').init(persistence, config);
    var session = persistenceStore.getSession();
    session.close();
  });

  /*
  it('can configure an in-memory store', function() {
    config.adaptor = 'memory';
    var persistenceStore = require('../../lib/persistence.store.config').init(persistence, config);
    var session = persistenceStore.getSession();
    session.close();
  });
  */
});
