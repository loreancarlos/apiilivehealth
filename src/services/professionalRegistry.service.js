import db from '../database/connection.js';

export class ProfessionalRegistryService {
  async list() {
    return db('professionalRegistry')
      .select(
        'professionalRegistry.*',
        'professional.name as professionalName',
        'registry.name as registryName'
      )
      .leftJoin('professional', 'professional.id', 'professionalRegistry.professionalId')
      .leftJoin('registry', 'registry.id', 'professionalRegistry.registryId')
      .orderBy('professionalRegistry.registryDate', 'desc');
  }

  async create(data) {
    const [registry] = await db('professionalRegistry')
      .insert(data)
      .returning('*');

    return this.findById(registry.id);
  }

  async findById(id) {
    return db('professionalRegistry')
      .select(
        'professionalRegistry.*',
        'professional.name as professionalName',
        'registry.name as registryName'
      )
      .leftJoin('professional', 'professional.id', 'professionalRegistry.professionalId')
      .leftJoin('registry', 'registry.id', 'professionalRegistry.registryId')
      .where('professionalRegistry.id', id)
      .first();
  }

  async update(id, data) {
    const [registry] = await db('professionalRegistry')
      .where({ id })
      .update(data)
      .returning('*');

    if (!registry) return null;
    return this.findById(registry.id);
  }

  async delete(id) {
    await db('professionalRegistry')
      .where({ id })
      .delete();
  }
}