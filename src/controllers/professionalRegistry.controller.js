import { ProfessionalRegistryService } from '../services/professionalRegistry.service.js';

export class ProfessionalRegistryController {
   constructor() {
      this.professionalRegistryService = new ProfessionalRegistryService();
   }

   list = async (req, res) => {
      try {
         const registries = await this.professionalRegistryService.list();
         return res.json(registries);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const registry = await this.professionalRegistryService.create(data);
         return res.status(201).json(registry);
      } catch (error) {
         if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid professional or registry' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const registry = await this.professionalRegistryService.findById(req.params.id);
         if (!registry) {
            return res.status(404).json({ error: 'Registry not found' });
         }
         return res.json(registry);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const registry = await this.professionalRegistryService.update(req.params.id, data);
         if (!registry) {
            return res.status(404).json({ error: 'Registry not found' });
         }
         return res.json(registry);
      } catch (error) {
         if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid professional or registry' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.professionalRegistryService.delete(req.params.id);
         return res.json({ message: 'Registry deleted successfully' });
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}