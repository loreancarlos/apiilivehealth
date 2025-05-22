export function up(knex) {
   return knex.schema.createTable('professionalReview', (table) => {
      table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
      table.uuid('userId').notNullable().references('id').inTable('user').onDelete('CASCADE');
      table.uuid('professionalId').notNullable().references('id').inTable('professional').onDelete('CASCADE');
      table.integer('stars').notNullable().defaultTo(0);
      table.string('comment').notNullable();
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
   });
}

export function down(knex) {
   return knex.schema.dropTable('professionalReview');
}