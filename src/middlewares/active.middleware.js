export function activeMiddleware(req, res, next) {
   if (!req.user.isActive) {
      return res.status(403).json({ error: 'Account is inactive' });
   }
   next();
}