import db from '../database/connection.js';

export class DependentService {
  async list() {
    return db('dependent')
      .select('*')
      .orderBy('name');
  }

  async create(data) {
    const [dependent] = await db('dependent')
      .insert({
        ...data,
        createdAt: db.fn.now(),
        updatedAt: db.fn.now()
      })
      .returning('*');

    return dependent;
  }

  async findById(id) {
    return db('dependent')
      .where({ id })
      .first();
  }

  async update(id, data) {
    const [dependent] = await db('dependent')
      .where({ id })
      .update({
        ...data,
        updatedAt: db.fn.now()
      })
      .returning('*');

    return dependent;
  }

  async delete(id) {
    const hasSales = await db('sale')
      .where({ dependentId: id })
      .first();

    if (hasSales) {
      throw new Error('DEPENDENT_HAS_SALES');
    }

    await db('dependent')
      .where({ id })
      .delete();
  }
}