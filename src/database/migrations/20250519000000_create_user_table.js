export function up(knex) {
   return knex.schema.createTable('user', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.string('cpf').unique();
      table.string('name').notNullable();
      table.string('perfilImage');
      table.date('dateOfBirth');
      table.enum('gender', ['male', 'female', 'others']);
      table.string('email').unique().notNullable();
      table.string('password').notNullable();
      table.string('phone').notNullable().unique();
      table.boolean('isActive').notNullable().defaultTo(true);
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('lastLogin');
   });
}

export function down(knex) {
   return knex.schema.dropTable('user');
}