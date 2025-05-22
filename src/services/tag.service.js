import db from '../database/connection.js';

export class TagService {
   async list() {
      return db('tag')
         .select('*')
         .orderBy('name');
   }

   async create(data) {
      const [tag] = await db('tag')
         .insert(data)
         .returning('*');
      return tag;
   }

   async findById(id) {
      return db('tag')
         .where({ id })
         .first();
   }

   async update(id, data) {
      const [tag] = await db('tag')
         .where({ id })
         .update(data)
         .returning('*');
      return tag;
   }

   async delete(id) {
      const hasServices = await db('serviceTag')
         .where({ tagId: id })
         .first();

      if (hasServices) {
         throw new Error('TAG_IN_USE');
      }

      await db('tag')
         .where({ id })
         .delete();
   }
}