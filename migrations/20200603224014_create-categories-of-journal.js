
exports.up = function(knex) {
    return knex.schema.createTable('categoriesofjournal', (table) => {
        table.integer('id_journal');
        table.integer('id_category');
        table.foreign('id_journal').references("journal.id");
        table.foreign('id_category').references("category.id");
    });
};

exports.down = function(knex) {
  
};
