export function up(knex) {
   return knex.schema.createTable('serviceTag', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('serviceId').notNullable().references('id').inTable('service').onDelete('CASCADE');
      table.uuid('tagId').notNullable().references('id').inTable('tag').onDelete('RESTRICT');
   });
}

export function down(knex) {
   return knex.schema.dropTable('serviceTag');
}