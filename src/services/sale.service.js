import db from '../database/connection.js';

export class SaleService {
  async list() {
    return db('sale')
      .select(
        'sale.*',
        'user.name as userName',
        'dependent.name as dependentName',
        'clinic.fantasyName as clinicName',
        'professional.name as professionalName',
        'service.description as serviceDescription',
        'paymentType.name as paymentTypeName'
      )
      .leftJoin('user', 'user.id', 'sale.userId')
      .leftJoin('dependent', 'dependent.id', 'sale.dependentId')
      .leftJoin('clinic', 'clinic.id', 'sale.clinicId')
      .leftJoin('professional', 'professional.id', 'sale.professionalId')
      .leftJoin('service', 'service.id', 'sale.serviceId')
      .leftJoin('paymentType', 'paymentType.id', 'sale.paymentTypeId')
      .orderBy('sale.date', 'desc');
  }

  async create(data) {
    const [sale] = await db('sale')
      .insert(data)
      .returning('*');

    return this.findById(sale.id);
  }

  async findById(id) {
    return db('sale')
      .select(
        'sale.*',
        'user.name as userName',
        'dependent.name as dependentName',
        'clinic.fantasyName as clinicName',
        'professional.name as professionalName',
        'service.description as serviceDescription',
        'paymentType.name as paymentTypeName'
      )
      .leftJoin('user', 'user.id', 'sale.userId')
      .leftJoin('dependent', 'dependent.id', 'sale.dependentId')
      .leftJoin('clinic', 'clinic.id', 'sale.clinicId')
      .leftJoin('professional', 'professional.id', 'sale.professionalId')
      .leftJoin('service', 'service.id', 'sale.serviceId')
      .leftJoin('paymentType', 'paymentType.id', 'sale.paymentTypeId')
      .where('sale.id', id)
      .first();
  }

  async update(id, data) {
    const [sale] = await db('sale')
      .where({ id })
      .update(data)
      .returning('*');

    if (!sale) return null;
    return this.findById(sale.id);
  }

  async delete(id) {
    await db('sale')
      .where({ id })
      .delete();
  }

  async updateStatus(id, status) {
    const [sale] = await db('sale')
      .where({ id })
      .update({ status })
      .returning('*');

    if (!sale) return null;
    return this.findById(sale.id);
  }
}