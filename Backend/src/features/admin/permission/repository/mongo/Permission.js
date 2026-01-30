import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: ['create', 'read', 'update', 'delete'],
    },
    resource: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        default: '',
    },
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

PermissionSchema.index({ name: 1, resource: 1 }, { unique: true });

const Permission = mongoose.model('Permission', PermissionSchema);

export default Permission;