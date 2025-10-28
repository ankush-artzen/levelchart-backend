import mongoose from 'mongoose';
const { Schema } = mongoose;

const OnlineAccessInfoSchema = new Schema(
  {
    sessionId: { type: String, unique: true, default: null },
    expiresIn: { type: Number, required: true },
    associatedUserScope: { type: String, required: true },
    associatedUser: { type: Schema.Types.ObjectId, ref: 'AssociatedUser', default: null },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'OnlineAccessInfo', 
  }
);

const OnlineAccessInfo = mongoose.model('OnlineAccessInfo', OnlineAccessInfoSchema);

export default  OnlineAccessInfo;
