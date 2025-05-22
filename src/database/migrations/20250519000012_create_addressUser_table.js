export function up(knex) {
   return knex.schema.createTable('addressUser', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('userId').notNullable().references('id').inTable('user').onDelete('CASCADE');
      table.uuid('addressTypeId').notNullable().references('id').inTable('addressType').onDelete('RESTRICT');
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
   });
}

export function down(knex) {
   return knex.schema.dropTable('addressUser');
}