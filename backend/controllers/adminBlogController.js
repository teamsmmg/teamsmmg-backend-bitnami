const Blog = require('../models/blogModel');

const createBlog = async (req, res) => {
  try {
    const { title, description, authorName, authorProfileLink } = req.body;
    const thumbnail = req.file.path;
    const newBlog = new Blog({
      title,
      thumbnail,
      description,
      author: {
        name: authorName,
        profileLink: authorProfileLink
      }
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully!', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createBlog };
