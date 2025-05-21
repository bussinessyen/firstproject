import express from 'express';
import { createJob, getJobs, getJobById } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createJob)
  .get(getJobs);

router.route('/:id')
  .get(getJobById);

export default router;