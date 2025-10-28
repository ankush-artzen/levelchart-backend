import mongoose from 'mongoose';
const { Schema } = mongoose;

const AssociatedUserSchema = new Schema(
    {
      onlineAccessInfoId: { type: String, unique: true, default: null },
      userId: { type: Schema.Types.BigInt, required: true },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      accountOwner: { type: Boolean, required: true },
      locale: { type: String, required: true },
      collaborator: { type: Boolean, required: true },
      emailVerified: { type: Boolean, required: true },
    },
    {
      timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
      collection: 'AssociatedUser', 
    }
  );
  
  const AssociatedUser = mongoose.model('AssociatedUser', AssociatedUserSchema);
  
  export default  AssociatedUser;
  