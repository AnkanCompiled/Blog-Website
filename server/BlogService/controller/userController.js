export async function dataController(req, res, next) {
  try {
    if (!req.user.email_verified) {
      const data = { id: req.user.id, email_verified: req.user.email_verified };
      return res
        .status(200)
        .json({ message: "Email not verified", data: data });
    }

    res.status(200).json({ message: "Access granted" });
  } catch (error) {
    next(error);
  }
}
