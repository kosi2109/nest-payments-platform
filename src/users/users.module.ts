import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './application/users.service';
import { UsersRepository } from './domain/users.repository';
import { PrismaUsersRepository } from './infrastructuer/prisma-users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  imports: [],
})
export class UsersModule {}
