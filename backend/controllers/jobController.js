import Job from '../models/jobModel.js';

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private
const createJob = async (req, res) => {
  try {
    const { title, description, budget, deadline, category, skills } = req.body;

    const job = await Job.create({
      title,
      description,
      clientId: req.user._id,
      budget,
      deadline,
      category,
      skills
    });

    const populatedJob = await job.populate('clientId', 'name email profilePicture');

    res.status(201).json(populatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate('clientId', 'name email profilePicture')
      .populate('bids.freelancerId', 'name email profilePicture')
      .sort('-createdAt');

    res.json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('clientId', 'name email profilePicture')
      .populate('bids.freelancerId', 'name email profilePicture');

    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createJob, getJobs, getJobById };