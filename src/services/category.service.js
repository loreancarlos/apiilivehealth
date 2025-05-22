import db from '../database/connection.js';

export class CategoryService {
   async list() {
      return db('category')
         .select('*')
         .orderBy('name');
   }

   async create(data) {
      const [category] = await db('category')
         .insert(data)
         .returning('*');
      return category;
   }

   async findById(id) {
      return db('category')
         .where({ id })
         .first();
   }

   async update(id, data) {
      const [category] = await db('category')
         .where({ id })
         .update(data)
         .returning('*');
      return category;
   }

   async delete(id) {
      const hasServices = await db('service')
         .where({ categoryId: id })
         .first();

      if (hasServices) {
         throw new Error('CATEGORY_IN_USE');
      }

      await db('category')
         .where({ id })
         .delete();
   }
}