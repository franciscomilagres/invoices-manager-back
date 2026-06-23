import { ImCustomer } from "../model/types";
import { prisma } from "../utils/db.utils";


export class CustomerService {
  async listAll(): Promise<ImCustomer[]> {
    const customers = await prisma.im_Customer.findMany();
    return customers;
  }
}

export const customerService = new CustomerService();