import { ClinicReviewService } from '../services/clinicReview.service.js';

export class ClinicReviewController {
   constructor() {
      this.clinicReviewService = new ClinicReviewService();
   }

   list = async (req, res) => {
      try {
         const reviews = await this.clinicReviewService.list();
         return res.json(reviews);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const review = await this.clinicReviewService.create(data);
         return res.status(201).json(review);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const review = await this.clinicReviewService.findById(req.params.id);
         if (!review) {
            return res.status(404).json({ error: 'Review not found' });
         }
         return res.json(review);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const review = await this.clinicReviewService.update(req.params.id, data);
         if (!review) {
            return res.status(404).json({ error: 'Review not found' });
         }
         return res.json(review);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.clinicReviewService.delete(req.params.id);
         return res.json({ message: 'Review deleted successfully' });
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}