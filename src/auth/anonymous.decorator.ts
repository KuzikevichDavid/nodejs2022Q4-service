import { SetMetadata } from '@nestjs/common';

export const IS_ANONYMOUS_KEY = 'AllowAnon';
export const AllowAnon = () => SetMetadata(IS_ANONYMOUS_KEY, true);
