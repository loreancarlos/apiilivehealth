export function up(knex) {
   return knex.schema.createTable('addressType', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('name').notNullable().unique();
   });
}

export function down(knex) {
   return knex.schema.dropTable('addressType');
}