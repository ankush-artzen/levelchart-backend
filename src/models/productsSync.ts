import mongoose from 'mongoose';

// Define schema for inventory levels
const InventoryLevelSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    quantities: [
      {
        id: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    location: {
      id: { type: String, required: true },
      name: { type: String, required: true },
    },
  },
  { _id: false }
);

// Define schema for inventory item
const InventoryItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    inventoryLevels: [InventoryLevelSchema],
  },
  { _id: false }
);

// Define schema for product variant
const ProductVariantSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    legacyResourceId: { type: String, required: true },
    inventoryQuantity: { type: Number, required: true },
    inventoryItem: InventoryItemSchema,
  },
  { _id: false }
);

// Define schema for product
const ProductSyncSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    legacyResourceId: { type: String, required: true },
    title: { type: String, required: true },
    handle: { type: String, required: true },
    variants: [ProductVariantSchema],
  },
  { timestamps: true, collection: 'ProductsSync' }
);

// Define Mongoose model
const ProductsSync = mongoose.model('ProductsSync', ProductSyncSchema);

export default ProductsSync;
