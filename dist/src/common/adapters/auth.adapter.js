"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port, options) {
        const server = super.createIOServer(port, Object.assign(Object.assign({}, options), { cors: true }));
        server.use((socket, next) => {
            var _a, _b;
            if ((_b = (_a = socket.handshake) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.token) {
                (0, jsonwebtoken_1.verify)(socket.handshake.query.token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
                    if (err) {
                        next(new Error('Authentication error'));
                    }
                    else {
                        socket.user = decoded;
                        next();
                    }
                });
            }
            else {
                next(new Error('Authentication error'));
            }
        });
        return server;
    }
}
exports.AuthAdapter = AuthAdapter;
//# sourceMappingURL=auth.adapter.js.map