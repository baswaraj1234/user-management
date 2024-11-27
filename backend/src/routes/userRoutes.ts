import { Router } from 'express';
import User, { IUser } from '../models/User';
import logger from '../utils/logger'; // Import the logger utility


const router = Router();

// GET /users - to Fetch all users
router.get('/users', async (req, res) => {
  try {
    logger.info('Fetching all users...');
    const users: IUser[] = await User.find().sort({_id:-1});
    logger.info(`Fetched ${users.length} users successfully.`);
    res.json(users);
  } catch (err:any) {
    logger.error(`Error fetching users: ${err.message}`, { error: err });
    res.status(500).json({ error: 'Failed to fetch users. Please try again later.' });
  }
});

// POST /users - Create a new user
router.post('/users', async (req:any, res:any) => {
  try {
    logger.info('Attempting to create a new user...', { body: req.body });
    // Validate request body
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      logger.warn('Validation failed: Missing required fields.');
      return res.status(400).json({ error: 'Missing required fields: firstName, lastName, or email.' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn(`User creation failed: Email already exists (${email}).`);
      return res.status(409).json({ error: 'A user with this email already exists.' });
    }

    // Create and save new user
    const user: IUser = new User(req.body);
    await user.save();
    logger.info(`User created successfully: ${user._id}`);
    res.status(201).json(user);
  } catch (err: any) {
    logger.error(`Error creating user: ${err.message}`, { error: err });

    // Handle Mongoose validation errors
    if (err.name === 'ValidationError') {
      const validationErrors = Object.values(err.errors).map((error: any) => error.message);
      logger.warn('Validation error while creating user', { details: validationErrors });
      return res.status(400).json({ error: 'Validation error', details: validationErrors });
    }

    res.status(500).json({ error: 'Failed to create user. Please try again later.' });
  }
});

export default router;
