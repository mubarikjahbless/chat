import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.route.decorator';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { version } from '../../package.json';
import { Logger } from 'winston';

@Controller()
@ApiTags('APP')
@Public()
export class AppController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Get('/health')
  @HttpCode(HttpStatus.OK)
  healthCheck(): { version: string } {
    this.logger.info(`Health calling, app version ${version}`);

    return { version };
  }
}
