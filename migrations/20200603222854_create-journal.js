
exports.up = function(knex) {
    return knex.schema.createTable('journal', (table) => {
        table.increments();
        table.text('name');
        table.text('publisher');
        table.text('homepage');
        table.text('country');
        table.boolean("isopenacess");
      });
};

exports.down = function(knex) {
  
};
