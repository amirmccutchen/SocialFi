import express from 'express';
import { verify } from 'jsonwebtoken';
import { getFeedPosts, getUserPosts, likePost} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// viewing posts on feed

router.get('/', verifyToken, getFeedPosts);

// viewing user's posts

router.get('/:userId/posts', verifyToken, getUserPosts);

// liking and unliking posts

router.patch('/:id/like', verifyToken, likePost);

export default router;