
exports.up = function(knex) {
    return knex.schema.createTable('issn', (table) => {
        table.increments();
        table.text('value');
        table.integer('id_journal');
        table.foreign('id_journal').references("journal.id");
    });
};

exports.down = function(knex) {
  
};
