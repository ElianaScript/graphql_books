import type { Request } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'mysecret';
const expiration = '2h';

export const authMiddleware = ({ req }: { req: Request }) => {
  let token = req.headers.authorization || '';

  if (token.startsWith ('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, secret);
    return { user: decoded }; 
  } catch {
    return { user: null };
  }
};

export const signToken = (user: any) => {
  return jwt.sign({ _id: user._id, email: user.email}, secret, { expiresIn: expiration });
};