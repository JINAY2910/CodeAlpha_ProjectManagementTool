import User from '../models/User.js';
import Task from '../models/Task.js';
import Notification from '../models/Notification.js';
import { createError } from '../utils/error.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const broadcastTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) return next(createError({ status: 400, message: 'Title is required' }));

    const users = await User.find();
    const tasks = users.map(user => ({
      title,
      user: user._id,
      completed: false
    }));

    await Task.insertMany(tasks);
    res.status(201).json({ message: 'Task broadcasted successfully' });
  } catch (err) {
    next(err);
  }
};

export const broadcastMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) return next(createError({ status: 400, message: 'Message is required' }));

    const users = await User.find();
    const notifications = users.map(user => ({
      message,
      user: user._id,
      isRead: false
    }));

    await Notification.insertMany(notifications);
    res.status(201).json({ message: 'Message broadcasted successfully' });
  } catch (err) {
    next(err);
  }
};

export const assignTaskToUser = async (req, res, next) => {
  try {
    const { userId, title } = req.body;
    if (!userId || !title) return next(createError({ status: 400, message: 'User ID and title are required' }));

    const newTask = new Task({ title, user: userId });
    await newTask.save();
    res.status(201).json({ message: 'Task assigned successfully', task: newTask });
  } catch (err) {
    next(err);
  }
};

export const sendMessageToUser = async (req, res, next) => {
  try {
    const { userId, message } = req.body;
    if (!userId || !message) return next(createError({ status: 400, message: 'User ID and message are required' }));

    const newNotification = new Notification({ message, user: userId });
    await newNotification.save();
    res.status(201).json({ message: 'Message sent successfully', notification: newNotification });
  } catch (err) {
    next(err);
  }
};
