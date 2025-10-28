import mongoose from 'mongoose';
const { Schema } = mongoose;

const SessionSchema = new Schema(
  {
    accessToken: {
      type: Schema.Types.Mixed, // Changed to Mixed to support both string and encrypted object
      default: null,
      get: function(token: any) {
        // Return the token as is, decryption should be handled in the business logic
        return token;
      }
    },
    expires: { type: Date, default: null },
    isOnline: { type: Boolean, required: true },
    scope: { type: String, default: null },
    shop: { type: String, required: true },
    state: { type: String, required: true },
    apiKey: { type: String, required: true },
    onlineAccessInfo: { type: Schema.Types.ObjectId, ref: 'OnlineAccessInfo', default: null },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'Session', // Explicitly specify the collection name
  }
);

const Session = mongoose.model('Session', SessionSchema);

export default Session;
