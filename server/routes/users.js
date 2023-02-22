import express from 'express';
import { getUser, getUserFriends, addRemoveFriend } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// routes for viewing a user, user friends, and adding/removing a friend

router.get('/:id', verifyToken, getUser);
router.get('/:id/friends', verifyToken, getUserFriends);

router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;