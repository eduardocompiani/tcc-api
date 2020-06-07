
exports.up = function(knex) {
    return knex.schema.createTable('category', (table) => {
        table.increments();
        table.text('name');
        table.integer('id_area');
        table.foreign('id_area').references("area.id");
    });
};

exports.down = function(knex) {
  
};
