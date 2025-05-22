import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema({
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  deliveryTime: { type: Number, required: true }, // in days
  proposal: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  budget: { type: Number, required: true },
  deadline: { type: Date, required: true },
  category: { type: String, required: true },
  skills: [{ type: String }],
  bids: [bidSchema],
  selectedBid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid' },
  status: { type: String, enum: ['OPEN', 'AWAITING_PAYMENT', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], default: 'OPEN' },
  createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
