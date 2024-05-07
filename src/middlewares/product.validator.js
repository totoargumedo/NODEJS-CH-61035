export const productValidator = (req, res, next) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;
  if (!title || !description || !code || !price || !stock || !category) {
    return res
      .status(400)
      .json({ status: "error", data: "All fields are required" });
  }
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof code !== "string" ||
    typeof price !== "number" ||
    typeof stock !== "number" ||
    typeof category !== "string"
  ) {
    return res.status(400).json({ status: "error", data: "Invalid data type" });
  }
  if (!status) {
    req.body.status = true;
  }
  if (thumbnails && Array.isArray(thumbnails) === false) {
    return res
      .status(400)
      .json({ status: "error", data: "Thumbnails must be Array type" });
  }
  if (!thumbnails) {
    req.body.thumbnails = [];
  }
  next();
};
