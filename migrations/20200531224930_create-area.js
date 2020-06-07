
exports.up = function(knex) {
  return knex.schema.createTable('area', (table) => {
    table.increments();
    table.text('name');
  });
};

exports.down = function(knex) {
  
};
