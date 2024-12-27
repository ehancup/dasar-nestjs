import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
// import { Request, Response } from 'express';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}
  async use(req: any, res: any, next: () => void) {
    const id: string = req.params[0];
    console.log(req.params);
    if (!id) throw new HttpException('no user', HttpStatus.UNAUTHORIZED);

    const user = await this.prismaService.users.findUnique({
      where: {
        id: id,
      },
    });

    console.log(user);

    if (!!user) {
      console.log('active');
      req.user = user;
      next();
    } else {
      throw new UnauthorizedException();
    }
  }
}
