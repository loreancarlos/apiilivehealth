import db from '../database/connection.js';

export class SpecialtyService {
   async list() {
      return db('specialty')
         .select('*')
         .orderBy('name');
   }

   async create(data) {
      const [specialty] = await db('specialty')
         .insert(data)
         .returning('*');
      return specialty;
   }

   async findById(id) {
      return db('specialty')
         .where({ id })
         .first();
   }

   async update(id, data) {
      const [specialty] = await db('specialty')
         .where({ id })
         .update(data)
         .returning('*');
      return specialty;
   }

   async delete(id) {
      const hasServices = await db('service')
         .where({ specialtyId: id })
         .first();

      const hasProfessionals = await db('professionalSpecialty')
         .where({ specialtyId: id })
         .first();

      if (hasServices || hasProfessionals) {
         throw new Error('SPECIALTY_IN_USE');
      }

      await db('specialty')
         .where({ id })
         .delete();
   }
}