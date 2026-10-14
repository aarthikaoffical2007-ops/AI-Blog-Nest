const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
  try {
    const { name, photo, message } = req.body;

    const blog = await Blog.create({
      userID: req.user.id,
      name,
      photo,
      message,
    });

    res.status(201).json({
      message: 'Blog created successfully',
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('userID', 'name email')
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { name, photo, message } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { name, photo, message },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        message: 'Blog not found',
      });
    }

    res.json({
      message: 'Blog updated successfully',
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: 'Blog not found',
      });
    }

    res.json({
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
};