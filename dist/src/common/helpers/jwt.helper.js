"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.verifyJwtToken = exports.createJwtToken = exports.loginPayload = void 0;
const common_1 = require("@nestjs/common");
const jwt = __importStar(require("jsonwebtoken"));
const getJwtSignature = () => {
    return {
        expiresIn: process.env.JWT_EXPIRE_IN,
        algorithm: process.env.JWT_ALGORITHM,
        audience: process.env.JWT_AUDIENCE,
        issuer: process.env.JWT_ISSUER,
    };
};
const loginPayload = (user) => {
    const { token } = (0, exports.createJwtToken)(user);
    const decoded = (0, exports.decodeToken)(token);
    const expireTime = decoded.exp;
    return {
        expireTime,
        user: { id: user.id, name: user.name },
        token,
    };
};
exports.loginPayload = loginPayload;
const createJwtToken = (user) => {
    const jwtSignature = getJwtSignature();
    const value = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_ACCESS_KEY, jwtSignature);
    return { token: value };
};
exports.createJwtToken = createJwtToken;
const verifyJwtToken = (token) => {
    try {
        const jwtSignature = getJwtSignature();
        return jwt.verify(token, process.env.JWT_ACCESS_KEY, jwtSignature);
    }
    catch (error) {
        throw new common_1.ForbiddenException('Authentication Denied');
    }
};
exports.verifyJwtToken = verifyJwtToken;
const decodeToken = (token) => {
    const decoded = jwt.decode(token);
    if (!decoded) {
        throw new common_1.ForbiddenException('invalid token');
    }
    return decoded;
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=jwt.helper.js.map