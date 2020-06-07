const baseQuery = require('./baseQuery');
const tableName = 'evaluation';

module.exports = {
    getAll() {
        return baseQuery.getAll(tableName);
    },
    getById(id) {
        return baseQuery.getById(tableName, id);
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