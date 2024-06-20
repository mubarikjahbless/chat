import * as jwt from 'jsonwebtoken';
import { User } from '../interfaces';
export declare const loginPayload: (user: User) => {
    expireTime: number;
    user: {
        id: string;
        name: string;
    };
    token: string;
};
export declare const createJwtToken: (user: User) => {
    token: string;
};
export declare const verifyJwtToken: (token: string) => string | jwt.JwtPayload;
export declare const decodeToken: (token: string) => string | jwt.JwtPayload;
