export function up(knex) {
   return knex.schema.createTable('professionalRegistry', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('professionalId').notNullable().references('id').inTable('professional').onDelete('CASCADE');
      table.uuid('registryId').notNullable().references('id').inTable('registry').onDelete('RESTRICT');
      table.date('registryDate').notNullable();
   });
}

export function down(knex) {
   return knex.schema.dropTable('professionalRegistry');
}