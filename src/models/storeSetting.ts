import mongoose, { Document, FilterQuery, Schema } from 'mongoose';

// Define the TypeScript interface for StoreSetting
interface IStoreSetting extends Document {
  isActive: boolean;
  shop: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema
const StoreSettingSchema = new Schema<IStoreSetting>(
  {
    isActive: { type: Boolean, required: true },
    shop: { type: String, required: true ,  unique: true},
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'StoreSetting', 
  }
);

// Create the model
const StoreSetting = mongoose.model<IStoreSetting>('StoreSetting', StoreSettingSchema);

// CRUD Functions

// Create a new store setting
export const createStoreSetting = async (data: Partial<IStoreSetting>): Promise<IStoreSetting> => {
  const storeSetting = new StoreSetting(data);
  return await storeSetting.save();
};

// Retrieve store settings by filter
export const getStoreSettings = async (filter: Partial<IStoreSetting> = {}): Promise<IStoreSetting[]> => {
  console.log(filter, "filter***********");
  return await StoreSetting.find(filter as FilterQuery<IStoreSetting>);
};

// Retrieve a store setting by ID
export const getStoreSettingById = async (id: string): Promise<IStoreSetting | null> => {
  return await StoreSetting.findById(id);
};

// Update a store setting by ID
export const updateStoreSetting = async (
  id: string,
  updateData: Partial<IStoreSetting>
): Promise<IStoreSetting | null> => {
  return await StoreSetting.findByIdAndUpdate(id, updateData, { new: true });
};

// Delete a store setting by ID
export const deleteStoreSetting = async (id: string): Promise<IStoreSetting | null> => {
  return await StoreSetting.findByIdAndDelete(id);
};

export default StoreSetting;
