import jwt from "jsonwebtoken";

export const generateToken = async (data) => {
  const token = await jwt.sign(
    {
      data,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES }
  );

  return token;
};

export const verifyToken = async (token) => {
  if (!token) {
    return false;
  }
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  return decoded;
};
