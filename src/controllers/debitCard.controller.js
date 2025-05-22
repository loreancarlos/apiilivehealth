import { DebitCardService } from '../services/debitCard.service.js';

export class DebitCardController {
   constructor() {
      this.debitCardService = new DebitCardService();
   }

   list = async (req, res) => {
      try {
         const debitCards = await this.debitCardService.list();
         return res.json(debitCards);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const debitCard = await this.debitCardService.create(data);
         return res.status(201).json(debitCard);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const debitCard = await this.debitCardService.findById(req.params.id);
         if (!debitCard) {
            return res.status(404).json({ error: 'Debit card not found' });
         }
         return res.json(debitCard);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const debitCard = await this.debitCardService.update(req.params.id, data);
         if (!debitCard) {
            return res.status(404).json({ error: 'Debit card not found' });
         }
         return res.json(debitCard);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.debitCardService.delete(req.params.id);
         return res.json({ message: 'Debit card deleted successfully' });
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}