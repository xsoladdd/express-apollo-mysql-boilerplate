import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = async (raw_password) => {
  const hashedPassword = await bcrypt.hash(raw_password, saltRounds);
  return hashedPassword;
};

export const checkPassword = async (raw_password, hashed_password) => {
  const result = await bcrypt.compare(raw_password, hashed_password);
  return result;
};
