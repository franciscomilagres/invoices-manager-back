import { prisma } from '../utils/db.utils'; // Adjust path based on your project structure
import { InvoiceStatus } from '../model/types'; // Adjust path based on your project structure

async function main() {
  console.log('Start seeding...');

  // 1. Clean up existing data (optional, but good for repeatable seeds)
  // Deleting in reverse order of foreign key dependencies
  await prisma.im_Payment.deleteMany();
  await prisma.im_Item.deleteMany();
  await prisma.im_Invoice.deleteMany();
  await prisma.im_Customer.deleteMany();
  console.log('Cleaned up existing data.');

  // 2. Define Item Data Templates (for creating items within invoices)
  const itemTemplates = [
    { name: 'Gaming Keyboard', price: 12000 }, // price in cents, e.g., 120.00
    { name: 'Gaming Mouse', price: 7500 },
    { name: 'Webcam 1080p', price: 5000 },
    { name: 'USB-C Hub', price: 3000 },
    { name: 'External SSD 1TB', price: 15000 },
    { name: 'Monitor Arm', price: 8000 },
    { name: 'Headphones', price: 10000 },
    { name: 'Mouse Pad XL', price: 1500 },
    { name: 'RGB LED Strip', price: 2500 },
    { name: 'Laptop Stand', price: 4000 },
  ];

  // 3. Define Customer Data
  const customerData = [
    { name: 'Alice Wonderland', email: 'alice@example.com' },
    { name: 'Bob The Builder', email: 'bob@example.com' },
    { name: 'Charlie Chaplin', email: 'charlie@example.com' },
    { name: 'Diana Prince', email: 'diana@example.com' },
    { name: 'Eve Harrington', email: 'eve@example.com' },
  ];

  // 4. Create Customers
  await prisma.im_Customer.createMany({
    data: customerData,
    skipDuplicates: true,
  });
  const customers = await prisma.im_Customer.findMany({take: 2});
  console.log(`Created ${customers.length} customers.`);

  // 5. Create Invoices and Items (each customer gets an invoice with 2 items)
  let itemCounter = 0;
  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i];
    const invoiceItems = [];
    const numItemsPerInvoice = 2;

    for (let j = 0; j < numItemsPerInvoice; j++) {
      if (itemCounter < itemTemplates.length) {
        invoiceItems.push(itemTemplates[itemCounter]);
        itemCounter++;
      } else {
        console.warn('Ran out of item templates. Check seed script logic.');
        break;
      }
    }

    if (invoiceItems.length > 0) {
      const invoiceData: any = {
        customer: { connect: { id: customer.id } },
        discount: i * 50, // Example: 0, 50, 100, etc.
        tax: 500, // Example: 5.00
        status: i % 2 === 0 ? InvoiceStatus.PAID : InvoiceStatus.PENDING, // Alternate PAID/PENDING
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000), // Invoice dates decrease by one day
        items: {
          create: invoiceItems,
        },
      };

      // Scenario: The first customer's invoice (i=0) has a payment.
      // The second customer's invoice (i=1) will not have a payment.
      if (i === 0) {
        invoiceData.payment = {
          create: {
            date: new Date(),
          },
        };
      }

      await prisma.im_Invoice.create({
        data: invoiceData,
      });
      console.log(`Created invoice for customer: ${customer.name}`);
    }
  }

  const createdInvoices = await prisma.im_Invoice.findMany();
  console.log(`Created ${createdInvoices.length} invoices.`);
  const createdItems = await prisma.im_Item.findMany();
  console.log(`Created ${createdItems.length} items.`);
  const createdPayments = await prisma.im_Payment.findMany();
  console.log(`Created ${createdPayments.length} payments.`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
