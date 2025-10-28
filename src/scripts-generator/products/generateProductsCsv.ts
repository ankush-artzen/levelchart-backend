import fs from 'fs';
import { writeToPath } from '@fast-csv/format';

// Generate dummy data
const generateDummyProducts = (count:number) => {
  const products = [];
  for (let i = 1; i <= count; i++) {
    products.push({
      Handle: `dummy-product-${i}`,
      Title: `Dummy Product ${i}`,
      "Body (HTML)": `<p>This is a description for Dummy Product ${i}.</p>`,
      Vendor: `Vendor ${Math.ceil(i / 100)}`, // Grouping vendors
      Type: `Type ${Math.ceil(i / 200)}`,     // Grouping types
      Tags: `tag${i},sample`,
      Published: "TRUE",
      "Option1 Name": "Size",
      "Option1 Value": i % 2 === 0 ? "Large" : "Small",
      "Variant SKU": `SKU${i.toString().padStart(4, '0')}`,
      "Variant Inventory Qty": Math.floor(Math.random() * 100),
      "Variant Price": (Math.random() * 100).toFixed(2),
      "Variant Compare At Price": ((Math.random() * 20) + 100).toFixed(2),
    });
  }
  return products;
};

// Write to CSV
const products = generateDummyProducts(1000);

writeToPath('./src/csv/dummy_products.csv', products, { headers: true })
  .on('finish', () => console.log('CSV file created: dummy_products.csv'))
  .on('error', (err:any) => console.error('Error writing CSV:', err));
