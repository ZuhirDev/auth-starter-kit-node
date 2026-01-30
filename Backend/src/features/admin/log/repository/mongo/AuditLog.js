import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.Mixed, 
        required: false,
    },
    module: { 
        type: String, 
        default: 'other', 
    },
    action: { 
        type: String, 
        required: true,
    },
    target_id: { 
        type: mongoose.Schema.Types.Mixed 
    },
    status: { 
        type: String, 
        enum: ['success','error','denied'], 
        default: 'success',
    },
    ip_address: { 
        type: String 
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

const AuditLog = mongoose.model('AuditLog', AuditLogSchema);

export default AuditLog;