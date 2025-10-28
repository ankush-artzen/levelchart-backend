import fs from 'fs';
import path from 'path';

const ordersCsvFile = path.join('./src/csv/ordersFile.csv');
const numberOfOrders = 500;

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomQuantity() {
  return Math.floor(Math.random() * 10) + 1; // Quantity between 1 and 10
}

function generateRandomPrice() {
  return (Math.random() * 100 + 10).toFixed(2); // Price between 10 and 110
}

async function generateDummyOrders() {
  const productIds = [
    {
      "id": "gid://shopify/Product/1",
      "title": "The VideoGraphed Snowboard"
    },
    {
      "id": "gid://shopify/Product/2",
      "title": "The Minimal Snowboard"
    },
    {
      "id": "gid://shopify/Product/3",
      "title": "The Archived Snowboard"
    },
    {
      "id": "gid://shopify/Product/4",
      "title": "The Collection Snowboard: Hydrogen"
    },
  ]
  

  const orders: string[] = [];
  orders.push('Order ID,Product ID,Product Title,Quantity,TotalPrice,CustomerName,CustomerEmail');

  for (let i = 1; i <= numberOfOrders; i++) {
    const product = getRandomElement(productIds);
    const quantity = generateRandomQuantity();
    const price = generateRandomPrice();

    orders.push(`${i},${product.id},${product.title},${quantity},${price},Customer-${i},customer${i}@example.com,`);
  }

  fs.writeFileSync(ordersCsvFile, orders.join('\n'));
  console.log(`Generated ${numberOfOrders} orders in ${ordersCsvFile}`);
}

generateDummyOrders().catch((error) => {
  console.error('Error generating dummy orders:', error);
});
