import { UsersRepository } from '../domain/users.repository';
import { User } from '../domain/user.entity';

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) ?? null;
  }
}
