import express from 'express';
import {
  createComment,
  getCommentsByPost,
  deleteComment,
} from '../controllers/commentController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

// Public - koi bhi comments dekh sakta hai
router.get('/:postId', getCommentsByPost);

// Protected - login zaruri hai
router.post('/:postId', userAuth, createComment);
router.delete('/:id', userAuth, deleteComment);

export default router;