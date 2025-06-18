export function up(knex) {
   return knex.schema.createTable('professionalClinicPartners', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('professionalId').notNullable().references('id').inTable('professional').onDelete('CASCADE');
      table.uuid('clinicId').notNullable().references('id').inTable('clinic').onDelete('CASCADE');
      table.enum('clinicApproved', ['pending', 'approved', 'rejected']).notNullable().defaultTo('pending');
      table.enum('professionalApproved', ['pending', 'approved', 'rejected']).notNullable().defaultTo('pending');
      table.string('message').notNullable();
      table.boolean('isActive').notNullable().defaultTo(false);
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
   });
}

export function down(knex) {
   return knex.schema.dropTable('professionalClinicPartners');
}