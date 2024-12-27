import { Test, TestingModule } from '@nestjs/testing';
import { OrmController } from './orm.controller';

describe('OrmController', () => {
  let controller: OrmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrmController],
    }).compile();

    controller = module.get<OrmController>(OrmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
