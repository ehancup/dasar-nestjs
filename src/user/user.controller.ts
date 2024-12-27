import {
  Controller,
  Get,
  Req,
  Ip,
  HostParam,
  Res,
  HttpRedirectResponse,
  Redirect,
  Query,
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  Param,
  UseGuards,
  Body,
  Post,
  // Request,
} from '@nestjs/common';
import { Request as ReqEx, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from './connection/connection';
import { Mail } from './mail/mail';
import { Repo } from './repo/repo';
import { MemberService } from './member/member.service';
import { PrismaService } from '../prisma/prisma.service';
// import { LogMiddleware } from 'src/log/log.middleware';
import { GuardGuard } from './guard/guard.guard';
import { Roles } from './guard/role.reflector';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RedisService } from 'src/redis/redis.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private connection: Connection,
    private mailService: Mail,
    private userRepository: Repo,
    private memberService: MemberService,
    private prismaService: PrismaService,
    private redisService: RedisService,
  ) {}
  @Get('/')
  get() {
    return this.userService.sayHello();
  }

  @Get('/category/:id')
  async getCategory(@Param('id') id: string) {
    const cachedData = await this.redisService.getCacheKey(`category_${id}`);
    if (cachedData) {
      return {
        message: 'Getting data from cache!',
        data: cachedData,
      };
    }

    const result = await this.prismaService.category.findUnique({
      where: { id },
    });

    if (!result) throw new HttpException('no category found', 404);

    await this.redisService.setCacheKey({
      key: `category_${id}`,
      data: result,
    });

    return {
      message: 'OK diambil dari database',
      data: result,
    };
  }

  @Get('/all-data')
  async allData() {
    const data = await this.prismaService.users.findMany();

    return {
      status: 'success',
      data,
    };
  }

  // @UseGuards(GuardGuard)
  // @Roles(['admin'])
  @Get('/find/:id')
  async getById(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new HttpException('invalid id', HttpStatus.UNPROCESSABLE_ENTITY),
        // errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        // optional: true,
      }),
    )
    id: string,
  ) {
    return this.userService.getByID(id);
  }

  @Get('/add-data')
  async addData(
    @Query('first_name') firstName: string,
    @Query('last_name') lastName: string,
  ) {
    if (!firstName || !lastName) {
      throw new HttpException('data is not complete', HttpStatus.BAD_REQUEST);
    }
    try {
      const add = await this.prismaService.users.create({
        data: {
          updatedAt: new Date(),
          first_name: firstName,
          last_name: lastName,
          role: 'user',
        },
      });

      return {
        status: 'success',
        message: 'data successfully added',
        data: add,
      };
    } catch (err) {
      return {
        status: 'error',
        message: err,
      };
    }
  }

  @Get('/member')
  member() {
    console.log(process.env.DATABASE);
    this.memberService.sendEmail();
    return this.memberService.getConnectionName();
  }

  @Get('/mail')
  mail() {
    this.userRepository.save();
    this.mailService.sendMail();
    return 'email sent';
  }

  @Get('/connection')
  async getConnection() {
    return this.connection.getName();
  }

  @Get('/redirect')
  @Redirect()
  async redirect(): Promise<HttpRedirectResponse> {
    return {
      url: '/user/7',
      statusCode: 200,
    };
  }

  @Get('/set-user')
  setUser(@Query('name') name: string, @Res() res: Response) {
    return res.cookie('name', name).status(200).json({
      message: 'set user successfull',
    });
  }

  @Get('/get-user')
  getUser(@Req() req: ReqEx) {
    return {
      message: 'get user successfull',
      name: req.cookies['name'],
    };
  }

  @Get('/view-hello')
  viewHello(@Req() req: ReqEx, @Res() res: Response) {
    return res.render('index.html', {
      title: 'greeting',
      name: req.cookies['name'],
    });
  }

  @Get('/:id')
  getId(
    @Req() req: ReqEx,
    @Ip() userIp,
    @HostParam() host,
    @Res() res: Response,
  ) {
    return res.status(300).json({
      idgetter: req.params.id,
      ip: userIp,
      host: host,
    });
  }

  @Post('/send-message')
  sendKafka(@Body() payload: any) {
    return this.userService.sendMessageSend(payload);
  }

  @MessagePattern('order')
  async getPayloadFormKafka(@Payload() payload) {
    console.log('payl', payload);

    return 'ok';
  }
}
