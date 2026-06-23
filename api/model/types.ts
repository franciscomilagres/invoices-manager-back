export enum InvoiceStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
}

export type ImCustomer = {
  id: string;
  name: string;
  email: string;
  invoices?: ImInvoice[];
}

export type ImInvoice = {
  id: string;
  customer_id: string;
  discount: number;
  tax: number;
  date: Date;
  status: InvoiceStatus;
  customer?: ImCustomer;
  items?: ImItem[];
  payment?: ImPayment | null;
}

export type ImPayment = {
  id: string;
  invoice_id: string;
  date: Date;
  invoice?: ImInvoice;
}

export type ImItem = {
  id: string;
  name: string;
  price: number;
  invoice_id: string;
  invoice?: ImInvoice;
}
