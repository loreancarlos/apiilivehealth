import { ServiceService } from '../services/service.service.js';

export class ServiceController {
   constructor() {
      this.serviceService = new ServiceService();
   }

   list = async (req, res) => {
      try {
         const services = await this.serviceService.list();
         return res.json(services);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const service = await this.serviceService.create(data);
         return res.status(201).json(service);
      } catch (error) {
         console.log(error);
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const service = await this.serviceService.findById(req.params.id);
         if (!service) {
            return res.status(404).json({ error: 'Service not found' });
         }
         return res.json(service);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const service = await this.serviceService.update(req.params.id, data);
         if (!service) {
            return res.status(404).json({ error: 'Service not found' });
         }
         return res.json(service);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.serviceService.delete(req.params.id);
         return res.json({ message: 'Service deleted successfully' });
      } catch (error) {
         if (error.message === 'SERVICE_HAS_SALES') {
            return res.status(400).json({ error: 'Service has sales and cannot be deleted' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   togglePromotion = async (req, res) => {
      try {
         const service = await this.serviceService.togglePromotion(req.params.id);
         if (!service) {
            return res.status(404).json({ error: 'Service not found' });
         }
         return res.json(service);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   toggleServiceStatus = async (req, res) => {
      try {
         const service = await this.serviceService.toggleServiceStatus(req.params.id);
         if (!service) {
            return res.status(404).json({ error: 'Service not found' });
         }
         return res.json(service);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}