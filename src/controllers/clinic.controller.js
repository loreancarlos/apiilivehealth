import { ClinicService } from '../services/clinic.service.js';

export class ClinicController {
   constructor() {
      this.clinicService = new ClinicService();
   }

   list = async (req, res) => {
      try {
         const clinics = await this.clinicService.list();
         return res.json(clinics);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const clinic = await this.clinicService.create(data);
         return res.status(201).json(clinic);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'CNPJ or email already registered' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const clinic = await this.clinicService.findById(req.params.id);
         if (!clinic) {
            return res.status(404).json({ error: 'Clinic not found' });
         }
         return res.json(clinic);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const clinic = await this.clinicService.update(req.params.id, data);
         if (!clinic) {
            return res.status(404).json({ error: 'Clinic not found' });
         }
         return res.json(clinic);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'CNPJ or email already registered' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.clinicService.delete(req.params.id);
         return res.json({ message: 'Clinic deleted successfully' });
      } catch (error) {
         if (error.message === 'CLINIC_HAS_DEPENDENCIES') {
            return res.status(400).json({ error: 'Clinic has dependencies and cannot be deleted' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   toggleStatus = async (req, res) => {
      try {
         const clinic = await this.clinicService.toggleStatus(req.params.id);
         if (!clinic) {
            return res.status(404).json({ error: 'Clinic not found' });
         }
         return res.json(clinic);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}