import mongoose from 'mongoose';
import CryptoJS from 'crypto-js';

const otpSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['confirmEmail', 'forgetPassword']
    },
    expiresIn: {
        type: Date,
        required: true
    }
}, { _id: false });

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    provider: {
        type: String,
        enum: ['google', 'system'],
        default: 'system'
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    DOB: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                const currentDate = new Date();
                if (value >= currentDate) return false;
                const ageDifMs = currentDate - value;
                const ageDate = new Date(ageDifMs);
                const age = Math.abs(ageDate.getUTCFullYear() - 1970);
                return age >= 18;
            },
            message: 'DOB must be a past date and user must be at least 18 years old'
        }
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['User', 'Admin', 'HR', 'Company Owner'],
        default: 'User'
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    bannedAt: {
        type: Date,
        default: null
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    changeCredentialTime: {
        type: Date,
        default: null
    },
    profilePic: {
        secure_url: { type: String, default: null },
        public_id: { type: String, default: null }
    },
    coverPic: {
        secure_url: { type: String, default: null },
        public_id: { type: String, default: null }
    },
    OTP: [otpSchema]
}, {
    timestamps: true
});

// Virtual field for username 
userSchema.virtual('userName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are included when converting documents to JSON or Objects
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

// Pre-save hook for encrypting mobileNumber 
userSchema.pre('save', function (next) {
    if (this.isModified('mobileNumber')) {
        const key = process.env.MOBILE_ENCRYPTION_KEY;
        const encrypted = CryptoJS.AES.encrypt(this.mobileNumber, key).toString();
        this.mobileNumber = encrypted;
    }
    next();
});

// Helper function to decrypt
function decryptMobileNumber(encryptedValue) {
    const key = process.env.MOBILE_ENCRYPTION_KEY;
    const bytes = CryptoJS.AES.decrypt(encryptedValue, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// toJSON transform: decrypt mobileNumber
userSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret) => {
        if (ret.mobileNumber) {
            ret.mobileNumber = decryptMobileNumber(ret.mobileNumber);
        }
        return ret;
    }
});
// mongoose hook for cascading deletion 
userSchema.pre('remove', async function (next) {
    next();
});

const userModel = mongoose.models.User || mongoose.model('User', userSchema);
export default userModel;
