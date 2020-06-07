
exports.up = function(knex) {
    return knex.schema.createTable('evaluation', (table) => {
        table.increments();
        table.integer("id_journal");
        table.integer("id_source");
        table.foreign('id_journal').references('journal.id');
        table.foreign('id_source').references('source.id');
    });
};

exports.down = function(knex) {
  
};
