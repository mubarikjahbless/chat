"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const package_json_1 = require("../package.json");
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const body_parser_1 = require("body-parser");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const api_response_service_1 = require("./common/utility/api-response.service");
const auth_adapter_1 = require("./common/adapters/auth.adapter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    const configService = app.get(config_1.ConfigService);
    const apiResponseService = app.get(api_response_service_1.ApiResponseService);
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (validationErrors = []) => {
            const errors = [];
            validationErrors.forEach((error) => {
                const fieldErrors = [];
                Object.keys(error.constraints).forEach((key) => {
                    fieldErrors.push(error.constraints[key]);
                });
                errors.push({ property: error.property, errors: fieldErrors });
            });
            return apiResponseService.validationErrorWithData('Validation error', errors);
        },
    }));
    app.use((0, cookie_parser_1.default)());
    app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
    app.use((0, body_parser_1.json)({ limit: '100mb' }));
    app.use((0, body_parser_1.urlencoded)({ limit: '100mb', extended: true }));
    app.setGlobalPrefix('/api/v1/', { exclude: ['docs'] });
    const limiter = (0, express_rate_limit_1.default)({
        windowMs: 1 * 60 * 1000,
        max: 20,
        keyGenerator: function (req, res) {
            return req.ip;
        },
    });
    app.use(limiter);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('App Apis')
        .setDescription(package_json_1.description)
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    app.use('/docs', async (req, res, next) => {
        return (0, express_basic_auth_1.default)({
            users: {
                [`${configService.get('docs.userName')}`]: `${configService.get('docs.password')}`,
            },
            challenge: true,
        })(req, res, next);
    });
    swagger_1.SwaggerModule.setup('docs', app, document);
    app.useWebSocketAdapter(new auth_adapter_1.AuthAdapter(app));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    await app.listen(configService.get('port'), async () => {
        console.log(`User Service Server Running on http://localhost:${configService.get('port')}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map