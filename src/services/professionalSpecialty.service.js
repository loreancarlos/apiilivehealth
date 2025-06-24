import db from '../database/connection.js';

export class ProfessionalSpecialtyService {
  async list() {
    return db('professionalSpecialty')
      .select(
        'professionalSpecialty.*',
        'professional.name as professionalName',
        'specialty.name as specialtyName',
        'specialty.id as specialtyId'
      )
      .leftJoin('professional', 'professional.id', 'professionalSpecialty.professionalId')
      .leftJoin('specialty', 'specialty.id', 'professionalSpecialty.specialtyId')
      .orderBy('professionalSpecialty.specialtyDate', 'desc');
  }
  async listForProfessional(id) {
    return db('professionalSpecialty')
      .select(
        'professionalSpecialty.*',
        'specialty.name as specialtyName',
        'specialty.id as specialtyId'
      )
      .leftJoin('specialty', 'specialty.id', 'professionalSpecialty.specialtyId')
      .where('professionalId', id)
      .orderBy('professionalSpecialty.specialtyDate', 'desc');
  }

  async create(data) {
    const [specialty] = await db('professionalSpecialty')
      .insert(data)
      .returning('*');

    return this.findById(specialty.id);
  }

  async findById(id) {
    return db('professionalSpecialty')
      .select(
        'professionalSpecialty.*',
        'professional.name as professionalName',
        'specialty.name as specialtyName'
      )
      .leftJoin('professional', 'professional.id', 'professionalSpecialty.professionalId')
      .leftJoin('specialty', 'specialty.id', 'professionalSpecialty.specialtyId')
      .where('professionalSpecialty.id', id)
      .first();
  }

  async update(id, data) {
    const [specialty] = await db('professionalSpecialty')
      .where({ id })
      .update(data)
      .returning('*');

    if (!specialty) return null;
    return this.findById(specialty.id);
  }

  async delete(id) {
    await db('professionalSpecialty')
      .where({ id })
      .delete();
  }
}