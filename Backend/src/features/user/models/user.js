import mongoose, { Schema } from "mongoose";

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
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role',
    }],
    permissions: [{
        type: Schema.Types.ObjectId,
        ref: 'Permission',
    }]
}, {
    timestamps: true,

    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            ret.id = ret._id.toString();
            delete ret._id;
        }
    },

    toObject: {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            ret.id = ret._id.toString();
            delete ret._id;
        }
    }
});

const User = mongoose.model('User', UserSchema);

export default User;