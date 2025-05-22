export function up(knex) {
   return knex.schema.createTable('professionalSpecialty', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('professionalId').notNullable().references('id').inTable('professional').onDelete('CASCADE');
      table.uuid('specialtyId').notNullable().references('id').inTable('specialty').onDelete('RESTRICT');
      table.date('specialtyDate').notNullable();
   });
}

export function down(knex) {
   return knex.schema.dropTable('professionalSpecialty');
}