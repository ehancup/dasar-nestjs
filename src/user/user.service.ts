import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private readonly kafkaService: KafkaService,
  ) {}
  sayHello() {
    return 'hello you';
  }

  async getByID(id: string) {
    const data = await this.prismaService.users.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) throw new HttpException('no user found', HttpStatus.NOT_FOUND);

    return {
      status: 'successs',
      data,
    };
  }

  async sendMessage(payload: any) {
    await this.kafkaService.sendMessagewithEmit(
      'order',
      'order_1',
      JSON.stringify(payload),
    );

    return 'berhasil terkirim';
  }
  async sendMessageSend(payload: any) {
    const response = await this.kafkaService.sendMessagewithSend(
      'order',
      'order_2',
      JSON.stringify(payload),
    );

    return response;
  }
}
