export function adminMiddleware(req, res, next) {
   if (req.user.type !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admins only.' });
   }
   next();
}