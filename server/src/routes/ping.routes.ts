import { Router } from 'express';
const router = Router();

router.get('/ping', (req, res) => {
  res.json({ message: '🚀 Backend activo y estructura lista' });
});

export default router;