import { Module } from '@nestjs/common';
import { OrmController } from './orm.controller';
import { OrmService } from './orm.service';

@Module({
  controllers: [OrmController],
  providers: [OrmService],
})
export class OrmModule {}
