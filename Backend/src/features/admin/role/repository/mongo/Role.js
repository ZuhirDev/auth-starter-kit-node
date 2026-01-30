import mongoose, { Schema } from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        default: '',
    },
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

const Role = mongoose.model('Role', RoleSchema);

export default Role;