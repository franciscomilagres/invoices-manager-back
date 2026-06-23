import "dotenv/config";
import { prisma } from "../utils/db.utils";


export interface ITablesCount {
  customersCount: number;
  invoicesCount: number;
  paymentsCount: number;
}

export class HealthService {
  async countTables(): Promise<ITablesCount> {
    try {
      const customersCountPromise = prisma.im_Customer.count();
      const invoicesCountPromise = prisma.im_Invoice.count();
      const paymentsCountPromise = prisma.im_Payment.count();

      const data = await Promise.all([customersCountPromise, invoicesCountPromise, paymentsCountPromise]);

      const customersCount = Number(data[0] ?? '0');
      const invoicesCount = Number(data[1] ?? '0');
      const paymentsCount = Number(data[2] ?? '0');

      return { customersCount, invoicesCount, paymentsCount };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch card data');
    }
  }
}

export const healthService = new HealthService();
