export function professionalMiddleware(req, res, next) {
   if (req.user.type !== 'professional') {
      return res.status(403).json({ error: 'Access denied. Professional only.' });
   }
   next();
}