import { ProfessionalClinicPartnersService } from '../services/professionalClinicPartners.service.js';

export class ProfessionalClinicPartnersController {
   constructor() {
      this.professionalClinicPartnersService = new ProfessionalClinicPartnersService();
   }

   list = async (req, res) => {
      try {
         const partners = await this.professionalClinicPartnersService.list();
         return res.json(partners);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   clinicsList = async (req, res) => {
      try {
         const partners = await this.professionalClinicPartnersService.clinicsList(req.user.id);
         return res.json(partners);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   professionalsList = async (req, res) => {
      try {
         const partners = await this.professionalClinicPartnersService.professionalsList(req.user.id);
         return res.json(partners);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const partner = await this.professionalClinicPartnersService.create(data);
         return res.status(201).json(partner);
      } catch (error) {
         if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid professional or clinic' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const partner = await this.professionalClinicPartnersService.findById(req.params.id);
         if (!partner) {
            return res.status(404).json({ error: 'Partnership not found' });
         }
         return res.json(partner);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const partner = await this.professionalClinicPartnersService.update(req.params.id, data);
         if (!partner) {
            return res.status(404).json({ error: 'Partnership not found' });
         }
         return res.json(partner);
      } catch (error) {
         if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid professional or clinic' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.professionalClinicPartnersService.delete(req.params.id);
         return res.json({ message: 'Partnership deleted successfully' });
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   professionalPartnershipResponse = async (req, res) => {
      try {
         const partner = await this.professionalClinicPartnersService.professionalPartnershipResponse(req.params.id, req.body.clinicApproved);
         if (!partner) {
            return res.status(404).json({ error: 'Partnership not found' });
         }
         return res.json(partner);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   clinicPartnershipResponse = async (req, res) => {
      try {
         const partner = await this.professionalClinicPartnersService.clinicPartnershipResponse(req.params.id, req.body.professionalApproved);
         if (!partner) {
            return res.status(404).json({ error: 'Partnership not found' });
         }
         return res.json(partner);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   toggleStatus = async (req, res) => {
      try {
         const partner = await this.professionalClinicPartnersService.toggleStatus(req.params.id);
         if (!partner) {
            return res.status(404).json({ error: 'Partnership not found' });
         }
         return res.json(partner);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}