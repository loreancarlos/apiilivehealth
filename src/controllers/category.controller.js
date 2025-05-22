import { CategoryService } from '../services/category.service.js';

export class CategoryController {
   constructor() {
      this.categoryService = new CategoryService();
   }

   list = async (req, res) => {
      try {
         const categories = await this.categoryService.list();
         return res.json(categories);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   create = async (req, res) => {
      try {
         const data = req.body;
         const category = await this.categoryService.create(data);
         return res.status(201).json(category);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'Name already exists' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   show = async (req, res) => {
      try {
         const category = await this.categoryService.findById(req.params.id);
         if (!category) {
            return res.status(404).json({ error: 'Category not found' });
         }
         return res.json(category);
      } catch (error) {
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   update = async (req, res) => {
      try {
         const data = req.body;
         const category = await this.categoryService.update(req.params.id, data);
         if (!category) {
            return res.status(404).json({ error: 'Category not found' });
         }
         return res.json(category);
      } catch (error) {
         if (error.code === '23505') {
            return res.status(400).json({ error: 'Name already exists' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }

   delete = async (req, res) => {
      try {
         await this.categoryService.delete(req.params.id);
         return res.json({ message: 'Category deleted successfully' });
      } catch (error) {
         if (error.message === 'CATEGORY_IN_USE') {
            return res.status(400).json({ error: 'Category is in use and cannot be deleted' });
         }
         return res.status(500).json({ error: 'Internal server error' });
      }
   }
}