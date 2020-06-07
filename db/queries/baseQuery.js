const knex = require('../knex');

module.exports = {
    getAll(tableName) {
        return knex(tableName);
    },
    getById(tableName, id) {
        return knex(tableName).where('id', id).first();
    },
    create(tableName, data) {
        return knex(tableName).insert(data, '*');
    },
    update(tableName, id, data) {
        return knex(tableName).where('id', id).update(data, '*');
    },
    delete(tableName, id) {
        return knex(tableName).where('id', id).del();
    }
}