const baseQuery = require('./baseQuery');
const kenx = require('../knex');
const tableName = 'issn';

module.exports = {
    getAll() {
        return baseQuery.getAll(tableName);
    },
    getById(id) {
        return baseQuery.getById(tableName, id);
    },
    getByJournalId(id) {
        return kenx(tableName).where('id_journal', id);
    },
    create(data) {
        return baseQuery.create(tableName, data);
    },
    update(id, data) {
        return baseQuery.update(tableName, id, data);
    },
    delete(id) {
        return baseQuery.delete(tableName, id);
    }
}