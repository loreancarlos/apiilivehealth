import { SpecialtyService } from '../services/specialty.service.js';

export class SpecialtyController {
   constructor() {
      this.specialtyService = new SpecialtyService();
   }

   list = async (req, res) => {
      try {
         const specialties = await this.specialtyService.list();
         return res.json(specialties);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const specialty = await this.specialtyService.create(data);
         return res.status(201).json(specialty);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'Name already exists' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const specialty = await this.specialtyService.findById(req.params.id);
         if (!specialty) {
            return res.status(404).json({ error: 'Specialty not found' });
         }
         return res.json(specialty);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const specialty = await this.specialtyService.update(req.params.id, data);
         if (!specialty) {
            return res.status(404).json({ error: 'Specialty not found' });
         }
         return res.json(specialty);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'Name already exists' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.specialtyService.delete(req.params.id);
         return res.json({ message: 'Specialty deleted successfully' });
      } catch (error) {
         if (error.message === 'SPECIALTY_IN_USE') {
            return res.status(400).json({ error: 'Specialty is in use and cannot be deleted' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}