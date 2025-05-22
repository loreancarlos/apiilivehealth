import { AddressUserService } from '../services/addressUser.service.js';

export class AddressUserController {
   constructor() {
      this.addressUserService = new AddressUserService();
   }

   list = async (req, res) => {
      try {
         const addressUsers = await this.addressUserService.list();
         return res.json(addressUsers);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const addressUser = await this.addressUserService.create(data);
         return res.status(201).json(addressUser);
      } catch (error) {
         if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid user or address type' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const addressUser = await this.addressUserService.findById(req.params.id);
         if (!addressUser) {
            return res.status(404).json({ error: 'User address not found' });
         }
         return res.json(addressUser);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const addressUser = await this.addressUserService.update(req.params.id, data);
         if (!addressUser) {
            return res.status(404).json({ error: 'User address not found' });
         }
         return res.json(addressUser);
      } catch (error) {
         if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid user or address type' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.addressUserService.delete(req.params.id);
         return res.json({ message: 'User address deleted successfully' });
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}