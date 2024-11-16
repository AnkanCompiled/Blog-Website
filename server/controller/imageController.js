const postImage = async (req, res, next) => {
  try {
    const image_link = await mySqlService.registerUser(
      req.body.email,
      req.body.password,
      req.body.name
    );
    res.status(201).json({ message: image_link });
  } catch (err) {
    next(err);
  }
};
