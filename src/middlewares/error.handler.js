export const errorHandler = (error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ status: "error", data: error.message });
};
