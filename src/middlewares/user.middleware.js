export function userMiddleware(req, res, next) {
   if (req.user.type !== 'user') {
      return res.status(403).json({ error: 'Access denied. User only.' });
   }
   next();
}