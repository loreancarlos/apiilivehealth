import { ProfessionalSpecialtyService } from '../services/professionalSpecialty.service.js';

export class ProfessionalSpecialtyController {
   constructor() {
      this.professionalSpecialtyService = new ProfessionalSpecialtyService();
   }

   list = async (req, res) => {
      try {
         const specialties = await this.professionalSpecialtyService.list();
         return res.json(specialties);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   listForProfessional = async (req, res) => {
      try {
         const specialties = await this.professionalSpecialtyService.listForProfessional(req.params.id);
         return res.json(specialties);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const specialty = await this.professionalSpecialtyService.create(data);
         return res.status(201).json(specialty);
      } catch (error) {
         if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid professional or specialty' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const specialty = await this.professionalSpecialtyService.findById(req.params.id);
         if (!specialty) {
            return res.status(404).json({ error: 'Professional specialty not found' });
         }
         return res.json(specialty);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const specialty = await this.professionalSpecialtyService.update(req.params.id, data);
         if (!specialty) {
            return res.status(404).json({ error: 'Professional specialty not found' });
         }
         return res.json(specialty);
      } catch (error) {
         if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid professional or specialty' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.professionalSpecialtyService.delete(req.params.id);
         return res.json({ message: 'Professional specialty deleted successfully' });
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}