import express from 'express';
import { createJob, getJobs, getJobById, submitBid, selectBid } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getJobs)
  .post(protect, createJob);

router.route('/:id')
  .get(getJobById);

router.route('/:id/bids')
  .post(protect, submitBid);

router.route('/:id/select-bid')
  .post(protect, selectBid);

export default router;