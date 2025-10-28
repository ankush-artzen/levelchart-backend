import mongoose from 'mongoose';

const storeIntegrationSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    sid: {
        type: String,
        unique: true,
        sparse: true
    },
    nickname: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    picture: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    shop: {
        type: String,
        trim: true
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    collection: 'StoreIntegration',
});

// Create a text index for search
storeIntegrationSchema.index({
    nickname: 'text',
    name: 'text',
    email: 'text',
    shop: 'text'
});

const StoreIntegration = mongoose.model('StoreIntegration', storeIntegrationSchema);

export default StoreIntegration;