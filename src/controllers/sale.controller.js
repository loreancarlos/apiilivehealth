import { SaleService } from '../services/sale.service.js';

export class SaleController {
   constructor() {
      this.saleService = new SaleService();
   }

   list = async (req, res) => {
      try {
         const sales = await this.saleService.list();
         return res.json(sales);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const sale = await this.saleService.create(data);
         return res.status(201).json(sale);
      } catch (error) {
         if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid reference to related entities' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const sale = await this.saleService.findById(req.params.id);
         if (!sale) {
            return res.status(404).json({ error: 'Sale not found' });
         }
         return res.json(sale);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const sale = await this.saleService.update(req.params.id, data);
         if (!sale) {
            return res.status(404).json({ error: 'Sale not found' });
         }
         return res.json(sale);
      } catch (error) {
         if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid reference to related entities' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.saleService.delete(req.params.id);
         return res.json({ message: 'Sale deleted successfully' });
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   updateStatus = async (req, res) => {
      try {
         const { status } = req.body;
         if (!['scheduled', 'completed', 'canceled'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
         }

         const sale = await this.saleService.updateStatus(req.params.id, status);
         if (!sale) {
            return res.status(404).json({ error: 'Sale not found' });
         }
         return res.json(sale);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}