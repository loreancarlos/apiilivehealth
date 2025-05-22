import bcrypt from 'bcryptjs';
import db from '../database/connection.js';

export class AuthService {
  async validateUserCredentials(email, password) {
    const user = await db('user')
      .where({ email })
      .first();

    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return null;

    return user;
  }

  async validateProfessionalCredentials(email, password) {
    const professional = await db('professional')
      .where({ email })
      .first();

    if (!professional) return null;

    const isValidPassword = await bcrypt.compare(password, professional.password);
    if (!isValidPassword) return null;

    return professional;
  }

  async validateClinicCredentials(email, password) {
    const clinic = await db('clinic')
      .where({ email })
      .first();

    if (!clinic) return null;

    const isValidPassword = await bcrypt.compare(password, clinic.password);
    if (!isValidPassword) return null;

    return clinic;
  }

  async updateLastLogin(id, type) {
    const table = type === 'professional' ? 'professional' : type === 'clinic' ? 'clinic' : 'user';
    await db(table)
      .where({ id })
      .update({ lastLogin: db.fn.now() });
  }

  async changePassword(id, currentPassword, newPassword, type) {
    const table = type === 'professional' ? 'professional' : type === 'clinic' ? 'clinic' : 'user';
    const entity = await db(table)
      .where({ id })
      .first();

    if (!entity) return false;

    const isValidPassword = await bcrypt.compare(currentPassword, entity.password);
    if (!isValidPassword) return false;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db(table)
      .where({ id })
      .update({ password: hashedPassword });

    return true;
  }
}