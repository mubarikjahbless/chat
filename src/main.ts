import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { description } from '../package.json';
import basicAuth from 'express-basic-auth';
import { json, urlencoded } from 'body-parser';
import rateLimit from 'express-rate-limit';
import { ValidationError, useContainer } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApiResponseService } from './common/utility/api-response.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService: ConfigService = app.get<ConfigService>(ConfigService);

  const apiResponseService = app.get(ApiResponseService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = [];
        validationErrors.forEach((error) => {
          const fieldErrors = [];
          Object.keys(error.constraints).forEach((key) => {
            fieldErrors.push(error.constraints[key]);
          });
          errors.push({ property: error.property, errors: fieldErrors });
        });
        return apiResponseService.validationErrorWithData(
          'Validation error',
          errors,
        );
      },
    }),
  );

  app.use(cookieParser());
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ limit: '100mb', extended: true }));
  app.setGlobalPrefix('/api/v1/user-mgt', { exclude: ['docs'] });
  const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 min
    max: 20, // No of Requests
    keyGenerator: function (req, res) {
      return req.ip;
    },
  });
  app.use(limiter); // This is used for rate limiting.
  const config = new DocumentBuilder()
    .setTitle('App Apis')
    .setDescription(description)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.use('/docs', async (req, res, next) => {
    return basicAuth({
      users: {
        [`${configService.get<string>(
          'docs.userName',
        )}`]: `${configService.get<string>('docs.password')}`,
      },
      challenge: true,
    })(req, res, next);
  });
  SwaggerModule.setup('docs', app, document);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(configService.get<number>('port'), async () => {
    console.log(
      `User Service Server Running on ${configService.get<number>('port')}`,
    );
  });
}
bootstrap();
