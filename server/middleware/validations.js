export const userValidation = (req, res, next) => {

  const { name, email, password, address } = req.body

  // Name
  if (!name || name.length < 20 || name.length > 60) {
    return res.status(400).json({
      message: "Name must be between 20 and 60 characters"
    });
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format"
    });
  }

  // Password
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/;
  if (!password || !passwordRegex.test(password)) {
    return res.status(400).json({
      message: "Password must be 8–16 chars with uppercase & special char"
    });
  }

  // Address
  if (!address || address.length > 400) {
    return res.status(400).json({
      message: "Address must be less than 400 characters"
    });
  }

  next()
};