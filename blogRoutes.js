const express = require('express');

const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createBlog);
router.get('/', getBlogs);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);

module.exports = router;