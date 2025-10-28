import mongoose from 'mongoose';
import { fetchLimit } from '../config/constant';

const ProductUpdateSchema = new mongoose.Schema(
  {
    store: { type: String, required: true },
    productCount: { type: Number, required: false , default:0 },
    nextPageToken:{ type: String, required: false  , default:null},
    hasNextPage:{type: Boolean, required: false }
  },
  {
    timestamps: true,
    collection: 'ProductUpdate', 
  },
);

// Method to increment productCount dynamically
ProductUpdateSchema.methods.incrementProductCount = async function (incrementBy = fetchLimit) {
  this.productCount += incrementBy; // Increment the count in memory
  await this.save(); // Persist changes to the database
};

// Static method for atomic increments
ProductUpdateSchema.statics.incrementProductCountForStore = async function (store, incrementBy = 1) {
  return this.findOneAndUpdate(
    { store }, // Match the store
    { $inc: { productCount: incrementBy } }, // Increment productCount atomically
    { new: true, upsert: true } // Return the updated document and create if not exists
  );
};

const ProductUpdate = mongoose.model('ProductUpdate', ProductUpdateSchema);

export default ProductUpdate;
