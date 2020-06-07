
exports.up = function(knex) {
    return knex.schema.createTable('attribute', (table) => {
        table.increments();
        table.text("name");
        table.integer('valuetype');
        table.float("attributedoublevalue");
        table.boolean("attributebooleanvalue");
        table.integer("attributeintvalue");
        table.text("attributetextvalue");
        table.integer("id_owner");
        table.integer("id_evaluation");
        table.foreign("id_owner").references("attribute.id");
        table.foreign("id_evaluation").references("evaluation.id");
    });
};

exports.down = function(knex) {
  
};
