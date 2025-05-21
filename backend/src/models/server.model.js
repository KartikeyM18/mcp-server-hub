import mongoose from 'mongoose';
const sectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    details: {
        type: String,
        required: true,
        trim: true,
    },
});
const serverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    sections: {
        type: [sectionSchema],
        default: [],
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    
        default: null,
    },
   
    githubRepo: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(v);
            },
            message: 'Invalid GitHub repository URL',
        },
    },
    tags: {
        type: [String],
        validate: {
          validator: function (value) {
            return Array.isArray(value) && new Set(value).size === value.length;
          },
          message: 'Duplicate tags are not allowed.'
        }
      },
      
    Approved:{
        type:String,
        enum: ['approved', 'pending', 'rejected'],
        default: 'pending',            
    }, 
      rejectionMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
    default: null,
  },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
   
},{

    timestamps: true,
    
});

serverSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

export const Server = mongoose.model('Server', serverSchema);


