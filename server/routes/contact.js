import express from 'express';
import { Message } from '../models/Message.js';
import mongoose from 'mongoose';

const router = express.Router();

// Fallback in-memory storage if MongoDB is not connected
const inMemoryMessages = [];

// @route   POST /api/contact
// @desc    Submit a contact inquiry form
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message.',
      });
    }

    const isMongoConnected = mongoose.connection.readyState === 1;

    let savedItem;
    if (isMongoConnected) {
      savedItem = await Message.create({
        name: name.trim(),
        email: email.trim(),
        subject: subject ? subject.trim() : 'General Inquiry',
        message: message.trim(),
        ip: req.ip || req.headers['x-forwarded-for'] || '',
      });
    } else {
      savedItem = {
        _id: 'mem_' + Date.now(),
        name: name.trim(),
        email: email.trim(),
        subject: subject ? subject.trim() : 'General Inquiry',
        message: message.trim(),
        createdAt: new Date(),
      };
      inMemoryMessages.push(savedItem);
    }

    return res.status(201).json({
      success: true,
      message: `Namaste ${name}! Your message has been received. I'll get back to you shortly at ${email}.`,
      data: {
        id: savedItem._id,
        name: savedItem.name,
        subject: savedItem.subject,
        createdAt: savedItem.createdAt,
      },
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal server error occurred while processing your message.',
    });
  }
});

// @route   GET /api/contact
// @desc    Retrieve all submitted contact inquiries (for admin / dashboard inspection)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const isMongoConnected = mongoose.connection.readyState === 1;
    let messages = [];

    if (isMongoConnected) {
      messages = await Message.find().sort({ createdAt: -1 }).limit(50);
    } else {
      messages = [...inMemoryMessages].reverse();
    }

    return res.json({
      success: true,
      count: messages.length,
      storage: isMongoConnected ? 'mongodb' : 'in-memory',
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
