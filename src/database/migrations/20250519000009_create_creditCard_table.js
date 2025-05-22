export function up(knex) {
   return knex.schema.createTable('creditCard', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('userId').notNullable().references('id').inTable('user').onDelete('CASCADE');
      table.string('number').notNullable();
      table.string('ownerCpf').notNullable();
      table.string('ownerName').notNullable();
      table.string('validity').notNullable();
      table.string('cvv').notNullable();
      table.string('alias').notNullable();
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
   });
}

export function down(knex) {
   return knex.schema.dropTable('creditCard');
}