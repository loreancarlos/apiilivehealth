import { ProfessionalService } from '../services/professional.service.js';

export class ProfessionalController {
   constructor() {
      this.professionalService = new ProfessionalService();
   }

   list = async (req, res) => {
      try {
         const professionals = await this.professionalService.list();
         return res.json(professionals);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const professional = await this.professionalService.create(data);
         return res.status(201).json(professional);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'CPF or email already registered' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const professional = await this.professionalService.findById(req.params.id);
         if (!professional) {
            return res.status(404).json({ error: 'Professional not found' });
         }
         return res.json(professional);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const professional = await this.professionalService.update(req.params.id, data);
         if (!professional) {
            return res.status(404).json({ error: 'Professional not found' });
         }
         return res.json(professional);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'CPF or email already registered' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.professionalService.delete(req.params.id);
         return res.json({ message: 'Professional deleted successfully' });
      } catch (error) {
         if (error.message === 'PROFESSIONAL_HAS_DEPENDENCIES') {
            return res.status(400).json({ error: 'Professional has dependencies and cannot be deleted' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   toggleStatus = async (req, res) => {
      try {
         const professional = await this.professionalService.toggleStatus(req.params.id);
         if (!professional) {
            return res.status(404).json({ error: 'Professional not found' });
         }
         return res.json(professional);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}