import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, RequestContext } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';
import { IsString, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

class TestDto {
  @IsString()
  name: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('belajar-kafka')
  async simpan(@Payload() payload) {
    console.log('payload', payload);
    const dto = plainToInstance(TestDto, payload);
    const errors = await validate(dto);
    console.log(errors);
    if (errors.length > 0) {
      console.log('Validation failed:', errors);
      return;
    }
    return await this.prismaService.category.create({
      data: {
        ...payload,
      },
    });
  }
}
