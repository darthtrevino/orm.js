var Q = require('q');

var persistence,
    persistenceStore,
    session,
    dbPath = __dirname + '/test-sqlite3.db';

// remove test database
function removeDb() {
    try {
        require('fs').unlinkSync(dbPath);
    } catch (err) {
    }
}

module.exports = {
    name: 'Sqlite3',
    configure: function() {
        persistence = require('../../../lib/persistence').createPersistence();
        persistenceStore = require('../../../lib/persistence.store.sqlite3');
        persistenceStore.config(persistence, dbPath);
        return persistence;
    },
    makeSession: function() {
        removeDb();
        var d = Q.defer();
        session = persistenceStore.getSession(function () {
            session.schemaSync(function(res, err) {
                if (err) { d.reject(err); }
                else d.resolve(session);
            });
        });
        return d.promise;
    },
    cleanup: function () {
        var d = Q.defer();
        session.close(function() {
            removeDb();
            d.resolve();
        });
        return d.promise;
    }
};