import { CreditCardService } from '../services/creditCard.service.js';

export class CreditCardController {
   constructor() {
      this.creditCardService = new CreditCardService();
   }

   list = async (req, res) => {
      try {
         const creditCards = await this.creditCardService.list();
         return res.json(creditCards);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const creditCard = await this.creditCardService.create(data);
         return res.status(201).json(creditCard);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const creditCard = await this.creditCardService.findById(req.params.id);
         if (!creditCard) {
            return res.status(404).json({ error: 'Credit card not found' });
         }
         return res.json(creditCard);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const creditCard = await this.creditCardService.update(req.params.id, data);
         if (!creditCard) {
            return res.status(404).json({ error: 'Credit card not found' });
         }
         return res.json(creditCard);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.creditCardService.delete(req.params.id);
         return res.json({ message: 'Credit card deleted successfully' });
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}