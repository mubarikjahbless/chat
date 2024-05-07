import { ForbiddenException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const getJwtSignature = (): jwt.SignOptions => {
  return {
    expiresIn: process.env.JWT_EXPIRE_IN,
    algorithm: process.env.JWT_ALGORITHM as jwt.Algorithm,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  };
};

export const createJwtToken = (data: any): { token: string } => {
  const jwtSignature = getJwtSignature();

  const value = jwt.sign(data, process.env.JWT_ACCESS_KEY, jwtSignature);

  return { token: value };
};

export const verifyJwtToken = (token: string): string | jwt.JwtPayload => {
  try {
    const jwtSignature = getJwtSignature();

    return jwt.verify(token, process.env.JWT_ACCESS_KEY, jwtSignature);
  } catch (error) {
    throw new ForbiddenException('Authentication Denied');
  }
};

export const decodeToken = (token: string): string | jwt.JwtPayload => {
  const decoded = jwt.decode(token);

  if (!decoded) {
    throw new ForbiddenException('invalid token');
  }

  return decoded;
};
