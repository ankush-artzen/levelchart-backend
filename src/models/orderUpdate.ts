import mongoose from 'mongoose';
import { fetchLimit } from '../config/constant';

const OrderUpdateSchema = new mongoose.Schema(
  {
    store: { type: String, required: true },
    orderCount: { type: Number, required: false , default:0 },
    nextPageToken:{ type: String, required: false  , default:null},
    hasNextPage:{type: Boolean, required: false }
  },
  {
    timestamps: true,
    collection: 'OrderUpdate', 
  },
);

// Method to increment orderCount dynamically
OrderUpdateSchema.methods.incrementOrderCount = async function (incrementBy = fetchLimit) {
  this.orderCount += incrementBy; // Increment the count in memory
  await this.save(); // Persist changes to the database
};

// Static method for atomic increments
OrderUpdateSchema.statics.incrementOrderCountForStore = async function (store, incrementBy = 1) {
  return this.findOneAndUpdate(
    { store }, // Match the store
    { $inc: { orderCount: incrementBy } }, // Increment orderCount atomically
    { new: true, upsert: true } // Return the updated document and create if not exists
  );
};

const OrderUpdate = mongoose.model('OrderUpdate', OrderUpdateSchema);

export default OrderUpdate;
