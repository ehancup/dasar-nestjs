import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Connection, createConnection } from './connection/connection';
import { Mail, mailService } from './mail/mail';
import { createUserRepo, Repo } from './repo/repo';
import { MemberService } from './member/member.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('UserController', () => {
  let controller: UserController;

  class GetIdRes {
    status: string;
    data: {
      id: string;
      first_name: string;
      last_name?: string;
      role: string;
    };
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
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
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('should return account', () => {
  //   expect(
  //     controller.getById('414d3c9f-0f85-4f16-b336-6a854d4676d9').then((e) => e),
  //   ).toBe({});
  // });
});
