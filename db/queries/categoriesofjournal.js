const baseQuery = require('./baseQuery');
const knex = require('../knex');
const tableName = 'categoriesofjournal';

module.exports = {
    create(data) {
        return baseQuery.create(tableName, data);
    },
    searchByJournal(id_journal) {
        return knex(tableName).where('id_journal', id_journal);
    },
    searchByCategory(id_category) {
        return knex(tableName).where('id_category', id_category);
    },
    searchByJournalAndCategory(id_journal, id_category) {
        return knex(tableName).where('id_category', id_category).andWhere('id_journal', id_journal);
    },
    deleteByJournal(id_journal) {
        return knex(tableName).where('id_journal', id_journal).del();
    },
    deleteByCategory(id_category) {
        return knex(tableName).where('id_category', id_category).del();
    },
    deleteByJournalAndCategory(id_journal, id_category) {
        return knex(tableName).where('id_category', id_category).andWhere('id_journal', id_journal).del();
    }
}