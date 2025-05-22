import jwt from 'jsonwebtoken';
import { AuthService } from '../services/auth.service.js';

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.validateUserCredentials(email, password);
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      if (!user.isActive) {
        return res.status(401).json({ error: 'User account is inactive' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          type: 'user'
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      await this.authService.updateLastLogin(user.id, 'user');
      return res.json({ token, user });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  professionalLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const professional = await this.authService.validateProfessionalCredentials(email, password);
      
      if (!professional) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      if (!professional.isActive) {
        return res.status(401).json({ error: 'Professional account is inactive' });
      }

      const token = jwt.sign(
        {
          id: professional.id,
          name: professional.name,
          email: professional.email,
          type: 'professional'
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      await this.authService.updateLastLogin(professional.id, 'professional');
      return res.json({ token, professional });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  clinicLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const clinic = await this.authService.validateClinicCredentials(email, password);
      
      if (!clinic) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      if (!clinic.isActive) {
        return res.status(401).json({ error: 'Clinic account is inactive' });
      }

      const token = jwt.sign(
        {
          id: clinic.id,
          corporateName: clinic.corporateName,
          email: clinic.email,
          type: 'clinic'
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      await this.authService.updateLastLogin(clinic.id, 'clinic');
      return res.json({ token, clinic });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  changePassword = async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const { id, type } = req.user;

      const success = await this.authService.changePassword(id, currentPassword, newPassword, type);
      if (!success) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      return res.json({ message: 'Password changed successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}