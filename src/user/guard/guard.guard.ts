import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { users_role } from '@prisma/client';
import { Reflector } from '@nestjs/core';
import { Roles } from './role.reflector';

@Injectable()
export class GuardGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | Observable<boolean> | boolean {
    const req = context.switchToHttp().getRequest().user;
    const roles: users_role[] = this.reflector.get(Roles, context.getHandler());

    if (!roles) return true;
    // const user = await this.prismaService.auth.findUnique({
    //   where: {
    //     id: req.params.id,
    //   },
    // });
    // console.log(req.params);
    console.log(req);
    return roles.includes(req.role);
  }
}
