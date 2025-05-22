export function clinicMiddleware(req, res, next) {
   if (req.user.type !== 'clinic') {
      return res.status(403).json({ error: 'Access denied. Clinic only.' });
   }
   next();
}