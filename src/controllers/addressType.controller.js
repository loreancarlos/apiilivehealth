import { AddressTypeService } from '../services/addressType.service.js';

export class AddressTypeController {
   constructor() {
      this.addressTypeService = new AddressTypeService();
   }

   list = async (req, res) => {
      try {
         const addressTypes = await this.addressTypeService.list();
         return res.json(addressTypes);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const addressType = await this.addressTypeService.create(data);
         return res.status(201).json(addressType);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'Name already exists' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const addressType = await this.addressTypeService.findById(req.params.id);
         if (!addressType) {
            return res.status(404).json({ error: 'Address type not found' });
         }
         return res.json(addressType);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const addressType = await this.addressTypeService.update(req.params.id, data);
         if (!addressType) {
            return res.status(404).json({ error: 'Address type not found' });
         }
         return res.json(addressType);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'Name already exists' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.addressTypeService.delete(req.params.id);
         return res.json({ message: 'Address type deleted successfully' });
      } catch (error) {
         if (error.message === 'ADDRESS_TYPE_IN_USE') {
            return res.status(400).json({ error: 'Address type is in use and cannot be deleted' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}