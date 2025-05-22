import db from '../database/connection.js';

export class AddressTypeService {
   async list() {
      return db('addressType')
         .select('*')
         .orderBy('name');
   }

   async create(data) {
      const [addressType] = await db('addressType')
         .insert(data)
         .returning('*');
      return addressType;
   }

   async findById(id) {
      return db('addressType')
         .where({ id })
         .first();
   }

   async update(id, data) {
      const [addressType] = await db('addressType')
         .where({ id })
         .update(data)
         .returning('*');
      return addressType;
   }

   async delete(id) {
      const hasAddresses = await db('addressUser')
         .where({ addressTypeId: id })
         .first();

      if (hasAddresses) {
         throw new Error('ADDRESS_TYPE_IN_USE');
      }

      await db('addressType')
         .where({ id })
         .delete();
   }
}