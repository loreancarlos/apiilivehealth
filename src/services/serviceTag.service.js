import db from '../database/connection.js';

export class ServiceTagService {
   async list() {
      return db('serviceTag')
         .select(
            'serviceTag.*',
            'service.description as serviceDescription',
            'tag.name as tagName'
         )
         .leftJoin('service', 'service.id', 'serviceTag.serviceId')
         .leftJoin('tag', 'tag.id', 'serviceTag.tagId');
   }

   async create(data) {
      const [serviceTag] = await db('serviceTag')
         .insert(data)
         .returning('*');

      return this.findById(serviceTag.id);
   }

   async findById(id) {
      return db('serviceTag')
         .select(
            'serviceTag.*',
            'service.description as serviceDescription',
            'tag.name as tagName'
         )
         .leftJoin('service', 'service.id', 'serviceTag.serviceId')
         .leftJoin('tag', 'tag.id', 'serviceTag.tagId')
         .where('serviceTag.id', id)
         .first();
   }

   async update(id, data) {
      const [serviceTag] = await db('serviceTag')
         .where({ id })
         .update(data)
         .returning('*');

      if (!serviceTag) return null;
      return this.findById(serviceTag.id);
   }

   async delete(id) {
      await db('serviceTag')
         .where({ id })
         .delete();
   }
}