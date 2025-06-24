import db from '../database/connection.js';

export class ProfessionalClinicPartnersService {
  async list() {
    return db('professionalClinicPartners')
      .select('*')
      .orderBy('professionalClinicPartners.createdAt', 'desc');
  }

  async clinicsList(id) {
    return db('professionalClinicPartners')
      .select('*')
      .where('professionalId', id)
      .orderBy('professionalClinicPartners.createdAt', 'desc');
  }

  async professionalsList(id) {
    return db('professionalClinicPartners')
      .select('*')
      .where('clinicId', id)
      .orderBy('professionalClinicPartners.createdAt', 'desc');
  }

  async create(data) {
    const [partner] = await db('professionalClinicPartners')
      .insert({
        ...data,
        createdAt: db.fn.now()
      })
      .returning('*');

    return this.findById(partner.id);
  }

  async findById(id) {
    return db('professionalClinicPartners')
      .select(
        'professionalClinicPartners.*',
        'professional.name as professionalName',
        'clinic.fantasyName as clinicName'
      )
      .leftJoin('professional', 'professional.id', 'professionalClinicPartners.professionalId')
      .leftJoin('clinic', 'clinic.id', 'professionalClinicPartners.clinicId')
      .where('professionalClinicPartners.id', id)
      .first();
  }

  async update(id, data) {
    const [partner] = await db('professionalClinicPartners')
      .where({ id })
      .update(data)
      .returning('*');

    if (!partner) return null;
    return this.findById(partner.id);
  }

  async delete(id) {
    await db('professionalClinicPartners')
      .where({ id })
      .delete();
  }

  async clinicPartnershipResponse(id, professionalApproved) {
    const [partner] = await db('professionalClinicPartners')
      .where({ id })
      .update({ professionalApproved })
      .returning('*');

    if (!partner) return null;

    professionalApproved === "approved" && this.toggleStatus(id);

    return this.findById(partner.id);
  }

  async professionalPartnershipResponse(id, clinicApproved) {
    const [partner] = await db('professionalClinicPartners')
      .where({ id })
      .update({ clinicApproved })
      .returning('*');

    if (!partner) return null;

    clinicApproved === "approved" && this.toggleStatus(id);

    return this.findById(partner.id);
  }

  async toggleStatus(id) {
    const [partner] = await db('professionalClinicPartners')
      .where({ id })
      .update({
        isActive: db.raw('NOT "isActive"')
      })
      .returning('*');

    if (!partner) return null;
    return this.findById(partner.id);
  }
}