import { DependentService } from '../services/dependent.service.js';

export class DependentController {
   constructor() {
      this.dependentService = new DependentService();
   }

   list = async (req, res) => {
      try {
         const dependents = await this.dependentService.list();
         return res.json(dependents);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const dependent = await this.dependentService.create(data);
         return res.status(201).json(dependent);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'CPF already registered' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const dependent = await this.dependentService.findById(req.params.id);
         if (!dependent) {
            return res.status(404).json({ error: 'Dependent not found' });
         }
         return res.json(dependent);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const dependent = await this.dependentService.update(req.params.id, data);
         if (!dependent) {
            return res.status(404).json({ error: 'Dependent not found' });
         }
         return res.json(dependent);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'CPF already registered' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.dependentService.delete(req.params.id);
         return res.json({ message: 'Dependent deleted successfully' });
      } catch (error) {
         if (error.message === 'DEPENDENT_HAS_SALES') {
            return res.status(400).json({ error: 'Dependent has sales and cannot be deleted' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}