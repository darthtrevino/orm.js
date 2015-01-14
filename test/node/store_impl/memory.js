var Q = require('q');

var persistence,
    persistenceStore,
    session;

module.exports = {
    name: 'In-Memory',
    configure: function() {
        persistence = require('../../../lib/persistence').createPersistence();
        persistenceStore = require('../../../lib/persistence.store.memory');
        persistenceStore.config(persistence);
        return persistence;
    },
    makeSession: function() {
        persistence.schemaSync();
        session = persistenceStore.getSession();
        return Q(session)
    },
    cleanup: function () {
        session.close();
        return Q(true);
    }
}