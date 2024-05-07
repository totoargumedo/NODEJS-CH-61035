export const productValidator = (req, res, next) => {
  const { title, description, code, price, status, stock, category } = req.body;
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !status ||
    !stock ||
    !category
  ) {
    return res
      .status(400)
      .json({ status: "error", data: "All fields are required" });
  }
  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof code !== "string" ||
    typeof price !== "number" ||
    typeof status !== "boolean" ||
    typeof stock !== "number" ||
    typeof category !== "string"
  ) {
    return res.status(400).json({ status: "error", data: "Invalid data type" });
  }
  next();
};
