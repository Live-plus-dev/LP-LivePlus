import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tenantPath: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['owner', 'user', 'doctor', 'admin'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Archived'],
    default: 'Active'
  },
  emailPreferences: {
    receiveNotifications: {
      type: Boolean,
      default: true
    },
    nextScheduledEmail: {
      type: Date,
      default: null
    },
    lastEmailSent: {
      type: Date,
      default: null
    }
  },
  medicalDetails: {
    clinicalHistory: {
      type: String,
      trim: true
    },
    surgicalHistory: {
      type: String,
      trim: true
    },
    familyHistory: {
      type: String,
      trim: true
    },
    habits: {
      type: String,
      trim: true
    },
    allergies: {
      type: String,
      trim: true
    },
    medications: {
      type: String,
      trim: true
    },
    lastDiagnosis: {
      date: {
        type: Date,
        default: Date.now
      },
      diagnosis: {
        type: String,
        trim: true
      },
      notes: {
        type: String,
        trim: true
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLoginAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

// Add compound index for tenantPath
UserSchema.index({ tenantPath: 1 });

// Export the schema instead of the model 