import express from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { checkAdmin } from '../utils/checkAdmin.js';
import {
  getAllUsers,
  broadcastTask,
  broadcastMessage,
  assignTaskToUser,
  sendMessageToUser
} from '../controllers/admin.js';

const router = express.Router();

router.use(checkAuth);
router.use(checkAdmin);

router.get('/users', getAllUsers);
router.post('/tasks/broadcast', broadcastTask);
router.post('/notifications/broadcast', broadcastMessage);
router.post('/tasks/assign', assignTaskToUser);
router.post('/notifications/send', sendMessageToUser);

export default router;
