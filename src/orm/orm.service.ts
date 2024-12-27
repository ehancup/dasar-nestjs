import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrmService {
  constructor(private prismaService: PrismaService) {}
  sayHello() {
    return 'hello';
  }

  async getData() {
    const data = await this.prismaService.users.findMany({
      include: {
        wallet: true,
        posts_posts_usersIdTousers: true,
      },
      where: {
        AND: [
          {
            wallet: {
              currency: {
                gte: 2500,
              },
            },
          },
        ],
      },
    });

    return {
      status: 'success',
      data: data,
    };
  }

  async createData() {
    const data = await this.prismaService.users.create({
      data: {
        first_name: 'raihan',
        last_name: 'yusuf',
        role: 'admin',
        wallet: {
          create: {
            currency: 3000,
            updatedAt: new Date(),
          },
        },
        updatedAt: new Date(),
        posts_posts_usersIdTousers: {
          create: {
            updatedAt: new Date(),
            rating: 4.5,
            category: {
              create: [
                {
                  name: 'book',
                },
                {
                  name: 'relasi',
                },
                {
                  name: 'contoh',
                },
              ],
            },
          },
        },
      },
    });

    return {
      data: data,
    };
  }

  async createPost(id: string) {
    const user = await this.prismaService.users.findUnique({
      where: {
        id: id,
      },
    });

    await this.prismaService.posts.create({
      data: {
        users_posts_usersIdTousers: {
          connect: {
            id: user.id,
          },
        },
        rating: 45,
        updatedAt: new Date(),
      },
    });
  }
}
