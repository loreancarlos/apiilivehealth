export function up(knex) {
   return knex.schema.createTable('professionalClinicPartners', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('professionalId').notNullable().references('id').inTable('professional').onDelete('CASCADE');
      table.uuid('clinicId').notNullable().references('id').inTable('clinic').onDelete('CASCADE');
      table.boolean('isActive').notNullable().defaultTo(true);
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
   });
}

export function down(knex) {
   return knex.schema.dropTable('professionalClinicPartners');
}