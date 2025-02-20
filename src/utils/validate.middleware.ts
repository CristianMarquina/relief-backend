export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map((err) => err.message).join(", ");
    return res.status(400).json({
      message: errorMessage,
    });
  }
  next();
};
