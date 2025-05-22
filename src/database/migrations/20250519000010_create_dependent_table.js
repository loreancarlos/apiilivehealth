export function up(knex) {
   return knex.schema.createTable('dependent', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('userId').notNullable().references('id').inTable('user').onDelete('CASCADE');
      table.string('cpf').notNullable().unique();
      table.string('name').notNullable();
      table.string('perfilImage');
      table.date('dateOfBirth').notNullable();
      table.enum('gender', ['male', 'female', 'others']).notNullable();
      table.string('phone').unique();
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
   });
}

export function down(knex) {
   return knex.schema.dropTable('dependent');
}