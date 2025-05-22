import db from '../database/connection.js';

export class PaymentTypeService {
   async list() {
      return db('paymentType')
         .select('*')
         .orderBy('name');
   }

   async create(data) {
      const [paymentType] = await db('paymentType')
         .insert(data)
         .returning('*');
      return paymentType;
   }

   async findById(id) {
      return db('paymentType')
         .where({ id })
         .first();
   }

   async update(id, data) {
      const [paymentType] = await db('paymentType')
         .where({ id })
         .update(data)
         .returning('*');
      return paymentType;
   }

   async delete(id) {
      const hasSales = await db('sale')
         .where({ paymentTypeId: id })
         .first();

      if (hasSales) {
         throw new Error('PAYMENT_TYPE_IN_USE');
      }

      await db('paymentType')
         .where({ id })
         .delete();
   }
}