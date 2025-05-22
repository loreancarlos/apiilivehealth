import db from '../database/connection.js';
import bcrypt from 'bcryptjs';

export class ProfessionalService {
  async list() {
    return db('professional')
      .select('*')
      .orderBy('name');
  }

  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [professional] = await db('professional')
      .insert({
        ...data,
        password: hashedPassword,
        createdAt: db.fn.now(),
        updatedAt: db.fn.now()
      })
      .returning('*');

    return professional;
  }

  async findById(id) {
    return db('professional')
      .where({ id })
      .first();
  }

  async update(id, data) {
    const updateData = { ...data };
    
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const [professional] = await db('professional')
      .where({ id })
      .update({
        ...updateData,
        updatedAt: db.fn.now()
      })
      .returning('*');

    return professional;
  }

  async delete(id) {
    const hasPartners = await db('professionalClinicPartners')
      .where({ professionalId: id })
      .first();

    const hasRegistries = await db('professionalRegistry')
      .where({ professionalId: id })
      .first();

    const hasSpecialties = await db('professionalSpecialty')
      .where({ professionalId: id })
      .first();

    if (hasPartners || hasRegistries || hasSpecialties) {
      throw new Error('PROFESSIONAL_HAS_DEPENDENCIES');
    }

    await db('professional')
      .where({ id })
      .delete();
  }

  async toggleStatus(id) {
    const [professional] = await db('professional')
      .where({ id })
      .update({
        isActive: db.raw('NOT "isActive"'),
        updatedAt: db.fn.now()
      })
      .returning('*');

    return professional;
  }
}