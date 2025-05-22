import db from '../database/connection.js';

export class CreditCardService {
  async list() {
    return db('creditCard')
      .select('*')
      .orderBy('createdAt', 'desc');
  }

  async create(data) {
    const [creditCard] = await db('creditCard')
      .insert({
        ...data,
        createdAt: db.fn.now()
      })
      .returning('*');

    return creditCard;
  }

  async findById(id) {
    return db('creditCard')
      .where({ id })
      .first();
  }

  async update(id, data) {
    const [creditCard] = await db('creditCard')
      .where({ id })
      .update(data)
      .returning('*');

    return creditCard;
  }

  async delete(id) {
    await db('creditCard')
      .where({ id })
      .delete();
  }
}