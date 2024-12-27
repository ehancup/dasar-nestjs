import { CacheModuleOptions } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

export const config: CacheModuleOptions = {
  store: redisStore,
  host: `${process.env.REDIS_HOST}`,
  port: Number(process.env.REDIS_PORT),
  auth_pass: `${process.env.REDIS_PASSWORD}`,
};
