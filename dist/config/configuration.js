"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DB_URL,
    },
    keys: {
        jwt_access_key: process.env.JWT_ACCESS_KEY,
        cipher_key: process.env.CIPHER_KEY
    },
    aws: {
        access_key_id: process.env.AWS_ACCESS_KEY_ID,
        secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
    },
    queue: {
        url: process.env.QUEUE_URL
    }
});
//# sourceMappingURL=configuration.js.map