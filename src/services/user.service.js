import db from '../database/connection.js';
import bcrypt from 'bcryptjs';

export class UserService {
  async list() {
    return db('user')
      .select('*')
      .orderBy('name');
  }

  async create(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [user] = await db('user')
      .insert({
        ...data,
        password: hashedPassword,
        createdAt: db.fn.now(),
        updatedAt: db.fn.now()
      })
      .returning('*');

    return user;
  }

  async findById(id) {
    return db('user')
      .where({ id })
      .first();
  }

  async update(id, data) {
    const updateData = { ...data };
    
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const [user] = await db('user')
      .where({ id })
      .update({
        ...updateData,
        updatedAt: db.fn.now()
      })
      .returning('*');

    return user;
  }

  async delete(id) {
    const hasDependents = await db('dependent')
      .where({ userId: id })
      .first();

    const hasAddresses = await db('addressUser')
      .where({ userId: id })
      .first();

    const hasReviews = await db('professionalReview')
      .where({ userId: id })
      .first();

    if (hasDependents || hasAddresses || hasReviews) {
      throw new Error('USER_HAS_DEPENDENCIES');
    }

    await db('user')
      .where({ id })
      .delete();
  }

  async toggleStatus(id) {
    const [user] = await db('user')
      .where({ id })
      .update({
        isActive: db.raw('NOT "isActive"'),
        updatedAt: db.fn.now()
      })
      .returning('*');

    return user;
  }
}