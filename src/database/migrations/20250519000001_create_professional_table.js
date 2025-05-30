export function up(knex) {
   return knex.schema.createTable('professional', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('cpf').notNullable().unique();
      table.string('name').notNullable();
      table.string('perfilImage');
      table.string('biography');
      table.date('dateOfBirth').notNullable();
      table.enum('gender', ['male', 'female', 'others']).notNullable();
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('phone').unique();
      table.jsonb('address');
      table.decimal('rating').notNullable().defaultTo(0);
      table.integer('reviewCount').notNullable().defaultTo(0);
      table.boolean('isActive').notNullable().defaultTo(true);
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('lastLogin');
   });
}

export function down(knex) {
   return knex.schema.dropTable('professional');
}