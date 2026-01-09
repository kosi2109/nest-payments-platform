import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './application/users.service';
import { UsersRepository } from './domain/users.repository';
import { InMemoryUsersRepository } from './infrastructuer/in-memory-users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: InMemoryUsersRepository,
    },
  ],
})
export class UsersModule {}
