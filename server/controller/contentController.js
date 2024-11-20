const contentService = require("../service/contentService");

const getPostIds = async (req, res, next) => {
  try {
    const posts = await contentService.getPostService();
    res.status(201).json(posts);
  } catch (err) {
    next(err);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const data = await contentService.getDetailService(
      req.body.user_id,
      req.body.post_id
    );
    res.status(201).json({ data: data });
  } catch (err) {
    next(err);
  }
};

const getImage = async (req, res, next) => {
  try {
    const filePath = await contentService.getImageService(req.params.image);
    res.status(201).sendFile(filePath);
  } catch (err) {
    next(err);
  }
};

module.exports = { getPostIds, getDetails, getImage };
