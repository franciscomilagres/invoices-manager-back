import { Router, Request, Response } from 'express';
import { healthService } from '../services/health.service';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hey there');
});

router.get('/db', async (req: Request, res: Response) => {
  const result = await healthService.countTables();
  res.status(200).json(result);
})

export default router;
