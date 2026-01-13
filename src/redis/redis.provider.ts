import Redis from 'ioredis';

export const RedisProvider = {
  provide: 'REDIS',
  useFactory: () => {
    return new Redis({
      host: '127.0.0.1',
      port: 6379,
    });
  },
};
