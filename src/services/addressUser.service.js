import db from '../database/connection.js';

export class AddressUserService {
   async list() {
      return db('addressUser')
         .select(
            'addressUser.*',
            'user.name as userName',
            'addressType.name as addressTypeName'
         )
         .leftJoin('user', 'user.id', 'addressUser.userId')
         .leftJoin('addressType', 'addressType.id', 'addressUser.addressTypeId')
         .orderBy('addressUser.createdAt', 'desc');
   }

   async create(data) {
      const [addressUser] = await db('addressUser')
         .insert({
            ...data,
            createdAt: db.fn.now(),
            updatedAt: db.fn.now()
         })
         .returning('*');

      return this.findById(addressUser.id);
   }

   async findById(id) {
      return db('addressUser')
         .select(
            'addressUser.*',
            'user.name as userName',
            'addressType.name as addressTypeName'
         )
         .leftJoin('user', 'user.id', 'addressUser.userId')
         .leftJoin('addressType', 'addressType.id', 'addressUser.addressTypeId')
         .where('addressUser.id', id)
         .first();
   }

   async update(id, data) {
      const [addressUser] = await db('addressUser')
         .where({ id })
         .update({
            ...data,
            updatedAt: db.fn.now()
         })
         .returning('*');

      if (!addressUser) return null;
      return this.findById(addressUser.id);
   }

   async delete(id) {
      await db('addressUser')
         .where({ id })
         .delete();
   }
}