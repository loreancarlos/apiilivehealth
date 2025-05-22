import db from '../database/connection.js';

export class DebitCardService {
  async list() {
    return db('debitCard')
      .select('*')
      .orderBy('createdAt', 'desc');
  }

  async create(data) {
    const [debitCard] = await db('debitCard')
      .insert({
        ...data,
        createdAt: db.fn.now()
      })
      .returning('*');

    return debitCard;
  }

  async findById(id) {
    return db('debitCard')
      .where({ id })
      .first();
  }

  async update(id, data) {
    const [debitCard] = await db('debitCard')
      .where({ id })
      .update(data)
      .returning('*');

    return debitCard;
  }

  async delete(id) {
    await db('debitCard')
      .where({ id })
      .delete();
  }
}