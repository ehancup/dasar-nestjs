import { Reflector } from '@nestjs/core';
import { users_role } from '@prisma/client';

export const Roles = Reflector.createDecorator<users_role[]>();
