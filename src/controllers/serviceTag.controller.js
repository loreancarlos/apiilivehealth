import { ServiceTagService } from '../services/serviceTag.service.js';

export class ServiceTagController {
   constructor() {
      this.serviceTagService = new ServiceTagService();
   }

   list = async (req, res) => {
      try {
         const serviceTags = await this.serviceTagService.list();
         return res.json(serviceTags);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const serviceTag = await this.serviceTagService.create(data);
         return res.status(201).json(serviceTag);
      } catch (error) {
         if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid service or tag' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const serviceTag = await this.serviceTagService.findById(req.params.id);
         if (!serviceTag) {
            return res.status(404).json({ error: 'Service tag not found' });
         }
         return res.json(serviceTag);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const serviceTag = await this.serviceTagService.update(req.params.id, data);
         if (!serviceTag) {
            return res.status(404).json({ error: 'Service tag not found' });
         }
         return res.json(serviceTag);
      } catch (error) {
         if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid service or tag' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.serviceTagService.delete(req.params.id);
         return res.json({ message: 'Service tag deleted successfully' });
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}