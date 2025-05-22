export function ownerMiddleware(req, res, next) {
   const resourceId = req.params.id;
   if (req.user.id !== resourceId) {
      return res.status(403).json({ error: 'Access denied. Owner only.' });
   }
   next();
}