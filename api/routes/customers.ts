import { Router, Request, Response } from 'express';
import { customerController } from '../controllers/customer.controller';


const router = Router();

router.get('/', (req: Request, res: Response) => {
  customerController.listAll(req, res);
})

export default router;