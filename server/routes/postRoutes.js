import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import userAuth from '../middleware/userAuth.js';   // sahi naam + path

const router = express.Router();

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);

// Protected routes
router.post('/', userAuth, createPost);
router.put('/:id', userAuth, updatePost);
router.delete('/:id', userAuth, deletePost);

export default router;