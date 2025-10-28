import mongoose from "mongoose";

const { Schema, model } = mongoose;

// Line Item Schema
const LineItemSchema = new Schema({
  title: { type: String, required: true },
  quantity: { type: Number, required: true },
  variantTitle: { type: String, default: null },
  variant: {
    id: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
  },
});

// Shipping Line Schema
const ShippingLineSchema = new Schema({
  code: { type: String, required: true },
  custom: { type: Boolean, default: false },
  deliveryCategory: { type: String, default: null },
  title: { type: String, required: true },
  price: { type: String, required: true },
});

// Customer Schema
const CustomerSchema = new Schema({
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
});

const TaxLineSchema = new Schema({
  price: { type: String, required: true },
  rate: { type: Number, required: true },
  ratePercentage: { type: Number, required: true },
  title: { type: String, required: true },
  source: { type: String, default: null }
}, { _id: false });

// Main Order Schema
const OrdersSyncSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    legacyResourceId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    customer: { type: CustomerSchema, required: true },
    totalPrice: { type: String, required: true },
    lineItems: [LineItemSchema],
    shippingLine: { type: ShippingLineSchema, required: true },
    taxExempt: { type: Boolean, default: false },
    taxLines: [TaxLineSchema],
    shop: { type: String, required: true } // Assuming tax lines are simple strings, adjust if needed.
  },
  { timestamps: true, collection: 'OrdersSync' } // Adds createdAt and updatedAt fields
);

const OrdersSync = model("OrdersSync", OrdersSyncSchema);

export default OrdersSync;
