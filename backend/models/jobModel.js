import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['OPEN', 'AWAITING_PAYMENT', 'IN_ESCROW', 'SUBMITTED', 'REVISION_REQUESTED', 'COMPLETE', 'DISPUTED', 'RESOLVED'],
    default: 'OPEN'
  },
  bids: [{
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    deliveryTime: {
      type: Number,
      required: true
    },
    proposal: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
      default: 'PENDING'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  selectedBid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  escrowFunded: {
    type: Boolean,
    default: false
  },
  escrowTxHash: String,
  completionTxHash: String,
  workSubmitted: {
    content: String,
    submittedAt: Date
  }
}, {
  timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

export default Job;