
exports.up = function(knex) {
    return knex.schema.createTable('scraped', (table) => {
        table.increments();
        table.text('link');
    });
};

exports.down = function(knex) {
  
};
