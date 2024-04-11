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
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { Connection } from './connection/connection';
import { Mail } from './mail/mail';
import { Repo } from './repo/repo';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private connection: Connection,
    private mailService: Mail,
    private userRepository: Repo,
  ) {}
  @Get('/')
  get() {
    return this.userService.sayHello();
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
  getUser(@Req() req: Request) {
    return {
      message: 'get user successfull',
      name: req.cookies['name'],
    };
  }

  @Get('/view-hello')
  viewHello(@Req() req: Request, @Res() res: Response) {
    return res.render('index.html', {
      title: 'greeting',
      name: req.cookies['name'],
    });
  }

  @Get('/:id')
  getId(
    @Req() req: Request,
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
}
