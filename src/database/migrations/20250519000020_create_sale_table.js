export function up(knex) {
   return knex.schema.createTable('sale', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('userId').notNullable().references('id').inTable('user').onDelete('RESTRICT');
      table.uuid('dependentId').references('id').inTable('dependent').onDelete('RESTRICT');
      table.uuid('clinicId').notNullable().references('id').inTable('clinic').onDelete('RESTRICT');
      table.uuid('professionalId').notNullable().references('id').inTable('professional').onDelete('RESTRICT');
      table.uuid('serviceId').notNullable().references('id').inTable('service').onDelete('RESTRICT');
      table.timestamp('date').notNullable().defaultTo(knex.fn.now());
      table.timestamp('appointmentAt');
      table.enu('status', ['scheduled', 'completed', 'canceled']).defaultTo('scheduled');
      table.decimal('price').notNullable().defaultTo(0);
      table.string('observation');
      table.string('confirmationCode');
      table.uuid('paymentTypeId').notNullable().references('id').inTable('paymentType').onDelete('RESTRICT');
   });
}

export function down(knex) {
   return knex.schema.dropTable('sale');
}