const Website = require('../models/WebsiteModel');

const getWebsiteBySlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const websiteData = await Website.findOne({ slug: slug });
    if (!websiteData) {
      return res.status(404).json({ message: 'Website not found' });
    }
    res.json(websiteData);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { getWebsiteBySlug };
