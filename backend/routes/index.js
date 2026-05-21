import express from "express";
import { checkAuth } from "../utils/checkAuth.js";
import authRoutes from './auth.js';
import usersRoutes from './users.js';
import tasksRoutes from './tasks.js';
import adminRoutes from './admin.js';
import notificationRoutes from './notifications.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', checkAuth, usersRoutes);
router.use('/tasks', checkAuth, tasksRoutes);
router.use('/admin', adminRoutes);
router.use('/notifications', notificationRoutes);

export default router;