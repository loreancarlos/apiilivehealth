export function up(knex) {
   return knex.schema.createTable('service', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('clinicId').notNullable().references('id').inTable('clinic').onDelete('CASCADE');
      table.specificType('professionalsId', 'text[]').notNullable();
      table.string('images');
      table.uuid('specialtyId').notNullable().references('id').inTable('specialty').onDelete('RESTRICT');
      table.decimal('price').notNullable().defaultTo(0);
      table.decimal('promotionalPrice').notNullable().defaultTo(0);
      table.boolean('isPromotionOn').defaultTo(false);
      table.integer('durationTime').notNullable().defaultTo(0);
      table.uuid('categoryId').notNullable().references('id').inTable('category').onDelete('RESTRICT');
      table.string('description').notNullable();
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
   });
}

export function down(knex) {
   return knex.schema.dropTable('service');
}