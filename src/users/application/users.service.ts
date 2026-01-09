import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.entity';
import { UsersRepository } from '../domain/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

  async register(email: string, password: string): Promise<User> {
    const user = new User(Date.now().toString(), email, password);
    await this.usersRepo.save(user);
    return user;
  }
}