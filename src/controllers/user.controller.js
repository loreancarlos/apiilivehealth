import { UserService } from '../services/user.service.js';

export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  list = async (req, res) => {
    try {
      const users = await this.userService.list();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  create = async (req, res) => {
    try {
      const data = req.body;
      const user = await this.userService.create(data);
      return res.status(201).json(user);
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Email or CPF already registered' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  show = async (req, res) => {
    try {
      const user = await this.userService.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  update = async (req, res) => {
    try {
      const data = req.body;
      const user = await this.userService.update(req.params.id, data);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Email or CPF already registered' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  delete = async (req, res) => {
    try {
      await this.userService.delete(req.params.id);
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      if (error.message === 'USER_HAS_DEPENDENCIES') {
        return res.status(400).json({ error: 'User has dependencies and cannot be deleted' });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  toggleStatus = async (req, res) => {
    try {
      const user = await this.userService.toggleStatus(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}