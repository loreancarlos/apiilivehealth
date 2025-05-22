import db from '../database/connection.js';

export class ServiceService {
   async list() {
      return db('service')
         .select(
            'service.*',
            'clinic.fantasyName as clinicName',
            'specialty.name as specialtyName',
            'category.name as categoryName'
         )
         .leftJoin('clinic', 'clinic.id', 'service.clinicId')
         .leftJoin('specialty', 'specialty.id', 'service.specialtyId')
         .leftJoin('category', 'category.id', 'service.categoryId')
         .orderBy('service.createdAt', 'desc');
   }

   async create(data) {
      const [service] = await db('service')
         .insert({
            ...data,
            createdAt: db.fn.now(),
            updatedAt: db.fn.now()
         })
         .returning('*');

      return this.findById(service.id);
   }

   async findById(id) {
      return db('service')
         .select(
            'service.*',
            'clinic.fantasyName as clinicName',
            'specialty.name as specialtyName',
            'category.name as categoryName'
         )
         .leftJoin('clinic', 'clinic.id', 'service.clinicId')
         .leftJoin('specialty', 'specialty.id', 'service.specialtyId')
         .leftJoin('category', 'category.id', 'service.categoryId')
         .where('service.id', id)
         .first();
   }

   async update(id, data) {
      const [service] = await db('service')
         .where({ id })
         .update({
            ...data,
            updatedAt: db.fn.now()
         })
         .returning('*');

      if (!service) return null;
      return this.findById(service.id);
   }

   async delete(id) {
      const hasSales = await db('sale')
         .where({ serviceId: id })
         .first();

      if (hasSales) {
         throw new Error('SERVICE_HAS_SALES');
      }

      await db('service')
         .where({ id })
         .delete();
   }

   async togglePromotion(id) {
      const [service] = await db('service')
         .where({ id })
         .update({
            isPromotionOn: db.raw('NOT "isPromotionOn"'),
            updatedAt: db.fn.now()
         })
         .returning('*');

      if (!service) return null;
      return this.findById(service.id);
   }
}