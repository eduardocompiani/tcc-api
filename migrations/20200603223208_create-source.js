
exports.up = function(knex) {
    return knex.schema.createTable('source', (table) => {
        table.increments();
        table.text('name');
        table.text('homepage');
        table.text('reference');
    });
};

exports.down = function(knex) {
  
};
