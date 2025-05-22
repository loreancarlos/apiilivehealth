import { PaymentTypeService } from '../services/paymentType.service.js';

export class PaymentTypeController {
   constructor() {
      this.paymentTypeService = new PaymentTypeService();
   }

   list = async (req, res) => {
      try {
         const paymentTypes = await this.paymentTypeService.list();
         return res.json(paymentTypes);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const paymentType = await this.paymentTypeService.create(data);
         return res.status(201).json(paymentType);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'Name already exists' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const paymentType = await this.paymentTypeService.findById(req.params.id);
         if (!paymentType) {
            return res.status(404).json({ error: 'Payment type not found' });
         }
         return res.json(paymentType);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const paymentType = await this.paymentTypeService.update(req.params.id, data);
         if (!paymentType) {
            return res.status(404).json({ error: 'Payment type not found' });
         }
         return res.json(paymentType);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'Name already exists' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.paymentTypeService.delete(req.params.id);
         return res.json({ message: 'Payment type deleted successfully' });
      } catch (error) {
         if (error.message === 'PAYMENT_TYPE_IN_USE') {
            return res.status(400).json({ error: 'Payment type is in use and cannot be deleted' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}