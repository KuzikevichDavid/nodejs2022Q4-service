import {
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { BadRequest } from 'src/utils/errors/badRequest.error';
import { Forbidden } from 'src/utils/errors/forbidden.error';
import { NotFound } from 'src/utils/errors/notFound.error';

export default abstract class EntityController {
  protected async exceptionHandler(err: unknown) {
    if (err instanceof NotFound) {
      throw new NotFoundException(err.message);
    }
    if (err instanceof BadRequest) {
      throw new BadRequestException(err.message);
    }
    if (err instanceof Forbidden) {
      throw new ForbiddenException(err.message);
    }

    throw err;
  }
}
