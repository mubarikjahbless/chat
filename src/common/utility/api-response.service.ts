import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { StatusCode } from '../enums/status-code.enum';

@Injectable()
export class ApiResponseService {
  successResponse(message: string) {
    return {
      status: StatusCode.SUCCESS,
      message,
    };
  }

  successResponseWithData(message: string, data: Record<string, any>) {
    return {
      status: StatusCode.SUCCESS,
      message,
      data,
    };
  }

  alreadyExistResponse(serverMsg: string, object: string) {
    throw new BadRequestException({
      statusCode: StatusCode.FAILURE,
      message: {
        serverMsg,
        clientMsg: `${object} already exists`,
      },
    });
  }

  errorResponse(serverMsg: string, clientMsg: string) {
    throw new BadRequestException({
      statusCode: StatusCode.FAILURE,
      message: {
        serverMsg,
        clientMsg,
      },
    });
  }

  notFoundResponse(resource?: string) {
    throw new NotFoundException({
      status: StatusCode.FAILURE,
      message: resource ? `${resource} not found` : 'Not found',
    });
  }

  validationErrorWithData(
    clientMsg: string,
    data: Record<string, any>,
    serverMsg = 'Validation error',
  ) {
    throw new BadRequestException({
      statusCode: StatusCode.FAILURE,
      message: {
        serverMsg,
        clientMsg,
      },
      data,
    });
  }

  validationErrorOnly(clientMsg: string, serverMsg = 'Validation error') {
    throw new BadRequestException({
      statusCode: StatusCode.FAILURE,
      message: {
        clientMsg,
        serverMsg,
      },
    });
  }

  unauthorizedResponse() {
    throw new ForbiddenException({
      statusCode: StatusCode.UNAUTHORIZED,
      message: 'Unauthorized Access',
    });
  }
}
