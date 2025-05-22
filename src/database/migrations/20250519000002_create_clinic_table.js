export function up(knex) {
   return knex.schema.createTable('clinic', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('cnpj').notNullable().unique();
      table.string('corporateName').notNullable();
      table.string('fantasyName').notNullable();
      table.string('email').unique().notNullable();
      table.string('logo');
      table.jsonb('images');
      table.jsonb('address').notNullable();
      table.jsonb('openingHours').notNullable();
      table.string('description');
      table.decimal('rating').notNullable().defaultTo(0);
      table.integer('reviewCount').notNullable().defaultTo(0);
      table.boolean('isActive').notNullable().defaultTo(true);
      table.string('phone').unique();
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('lastLogin');
   });
}

export function down(knex) {
   return knex.schema.dropTable('clinic');
}