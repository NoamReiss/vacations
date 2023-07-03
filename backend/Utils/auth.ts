import jwt from "jsonwebtoken";
import User from "../Models/User";

export const generateAuthToken = (user: User): string => {
  const secretKey = process.env.JWT_SECRET_KEY as string;
  if (!secretKey) {
    throw new Error("JWT secret key is not defined");
  }
  const token = jwt.sign(
    {
      userId: user.user_code,
      isAdmin: user.isAdmin,
    },
    secretKey,
    {
      expiresIn: 6000,
    }
  );
  return token;
};

export const verifyAuthToken = (token: string): any => {
  const secretKey = process.env.SECRET_KEY as string;
  if (!secretKey) {
    throw new Error("JWT secret key is not defined");
  }
  const decodedToken = jwt.verify(token, secretKey) as {
    userId: number;
    isAdmin: boolean;
  };
  return decodedToken;
};
