import express from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { getMyNotifications, markAsRead, deleteNotification } from '../controllers/notification.js';

const router = express.Router();

router.use(checkAuth);

router.get('/my', getMyNotifications);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteNotification);

export default router;
