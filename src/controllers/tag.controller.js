import { TagService } from '../services/tag.service.js';

export class TagController {
   constructor() {
      this.tagService = new TagService();
   }

   list = async (req, res) => {
      try {
         const tags = await this.tagService.list();
         return res.json(tags);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const tag = await this.tagService.create(data);
         return res.status(201).json(tag);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'Name already exists' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const tag = await this.tagService.findById(req.params.id);
         if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
         }
         return res.json(tag);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const tag = await this.tagService.update(req.params.id, data);
         if (!tag) {
            return res.status(404).json({ error: 'Tag not found' });
         }
         return res.json(tag);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'Name already exists' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.tagService.delete(req.params.id);
         return res.json({ message: 'Tag deleted successfully' });
      } catch (error) {
         if (error.message === 'TAG_IN_USE') {
            return res.status(400).json({ error: 'Tag is in use and cannot be deleted' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}