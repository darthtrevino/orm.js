var config;
var stores = [
  'mysql',
  'memory',
  //'sqlite3'
];

function canOpenAndCloseSession() {
  var persistence = require('../../lib/persistence').createPersistence();
  var persistenceStore = require('../../lib/persistence.store.config').init(persistence, config);
  var session = persistenceStore.getSession();
  session.close();
}

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

  it('can configure a default store', canOpenAndCloseSession);

  for (var index in stores) {
    var type = stores[index];
    it("can configure a " + type + " store", function() {
      config.adaptor = type;
      canOpenAndCloseSession();
    });
  }
});