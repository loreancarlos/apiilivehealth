import db from '../database/connection.js';

export class RegistryService {
   async list() {
      return db('registry')
         .select('*')
         .orderBy('name');
   }

   async create(data) {
      const [registry] = await db('registry')
         .insert(data)
         .returning('*');
      return registry;
   }

   async findById(id) {
      return db('registry')
         .where({ id })
         .first();
   }

   async update(id, data) {
      const [registry] = await db('registry')
         .where({ id })
         .update(data)
         .returning('*');
      return registry;
   }

   async delete(id) {
      const hasRegistries = await db('professionalRegistry')
         .where({ registryId: id })
         .first();

      if (hasRegistries) {
         throw new Error('REGISTRY_IN_USE');
      }

      await db('registry')
         .where({ id })
         .delete();
   }
}