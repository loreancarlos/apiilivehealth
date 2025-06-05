import db from '../database/connection.js';
import bcrypt from 'bcryptjs';

export class ClinicService {
  async list() {
    return db('clinic')
      .select('*')
      .orderBy('fantasyName');
  }

  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [clinic] = await db('clinic')
      .insert({
        ...data,
        password: hashedPassword,
        openingHours: JSON.stringify(data.openingHours)
      })
      .returning('*');

    return clinic;
  }

  async findById(id) {
    return db('clinic')
      .where({ id })
      .first();
  }

  async update(id, data) {
    const updateData = { ...data };
    
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const [clinic] = await db('clinic')
      .where({ id })
      .update({
        ...updateData,
        updatedAt: db.fn.now()
      })
      .returning('*');

    return clinic;
  }

  async delete(id) {
    const hasPartners = await db('professionalClinicPartners')
      .where({ clinicId: id })
      .first();

    const hasServices = await db('service')
      .where({ clinicId: id })
      .first();

    if (hasPartners || hasServices) {
      throw new Error('CLINIC_HAS_DEPENDENCIES');
    }

    await db('clinic')
      .where({ id })
      .delete();
  }

  async toggleStatus(id) {
    const [clinic] = await db('clinic')
      .where({ id })
      .update({
        isActive: db.raw('NOT "isActive"'),
        updatedAt: db.fn.now()
      })
      .returning('*');

    return clinic;
  }
}