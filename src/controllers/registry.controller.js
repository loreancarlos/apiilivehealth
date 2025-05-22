import { RegistryService } from '../services/registry.service.js';

export class RegistryController {
   constructor() {
      this.registryService = new RegistryService();
   }

   list = async (req, res) => {
      try {
         const registries = await this.registryService.list();
         return res.json(registries);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const registry = await this.registryService.create(data);
         return res.status(201).json(registry);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'Name already exists' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const registry = await this.registryService.findById(req.params.id);
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
         const registry = await this.registryService.update(req.params.id, data);
         if (!registry) {
            return res.status(404).json({ error: 'Registry not found' });
         }
         return res.json(registry);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'Name already exists' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.registryService.delete(req.params.id);
         return res.json({ message: 'Registry deleted successfully' });
      } catch (error) {
         if (error.message === 'REGISTRY_IN_USE') {
            return res.status(400).json({ error: 'Registry is in use and cannot be deleted' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}