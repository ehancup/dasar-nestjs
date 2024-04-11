import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {
  Connection,
  MongoConnection,
  MySqlConnection,
} from './connection/connection';
import { createUserRepo, Repo } from './repo/repo';
import { Mail, mailService } from './mail/mail';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Connection,
      useClass:
        process.env.DATABASE == 'mysql' ? MySqlConnection : MongoConnection,
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
  ],
})
export class UserModule {}
