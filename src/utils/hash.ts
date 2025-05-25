import bcrypt from "bcrypt";

export const generatePasswordHash = (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const verifyPasswordHash = (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
