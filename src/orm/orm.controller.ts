import { Controller, Get } from '@nestjs/common';
import { OrmService } from './orm.service';

@Controller('orm')
export class OrmController {
  constructor(private ormService: OrmService) {}

  @Get('/')
  sayHello() {
    return this.ormService.sayHello();
  }

  @Get('/all-data')
  getData() {
    return this.ormService.getData();
  }

  @Get('/create-user')
  create() {
    return this.ormService.createData();
  }
}
