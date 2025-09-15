import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    email_verified_at: {
        type: Date, 
        default: null,
    },
    twoFASecret: {
        type: String,
        default: null,
    },
    is2FAVerified: {
        type: Boolean,
        default: false,
    },
    tempToken: {
        type: String,
        default: null,
    },
    tempTokenExpires: {
        type: Date,
        default: null,
    },    
});

const User = mongoose.model('User', UserSchema);

export default User;