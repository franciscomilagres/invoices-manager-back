import {Request, Response } from 'express';
import { ImCustomer } from '../model/types';
import { customerService } from '../services/customer.service';

export class CustomerController {

  async listAll(req: Request, res: Response): Promise<void> {
    const customers = await customerService.listAll();
    res.status(200).json(customers);
  }
}

export const customerController = new CustomerController();