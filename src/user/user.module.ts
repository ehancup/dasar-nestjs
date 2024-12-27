import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Connection, createConnection } from './connection/connection';
import { createUserRepo, Repo } from './repo/repo';
import { Mail, mailService } from './mail/mail';
import { MemberService } from './member/member.service';
import { AuthMiddleware } from './auth/auth.middleware';
// import { LogMiddleware } from 'src/log/log.middleware';
// import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  // imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      // useClass:
      //   process.env.DATABASE == 'mysql' ? MySqlConnection : MongoConnection,
      useFactory: createConnection,
    },
    {
      provide: Mail,
      useValue: mailService,
    },
    {
      provide: Repo,
      useFactory: createUserRepo,
      inject: [Connection],
    },
    MemberService,
  ],
  exports: [UserService],
})
// implements NestModule
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/user/find/*',
      method: RequestMethod.GET,
    });
  }
}
