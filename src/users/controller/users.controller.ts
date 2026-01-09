import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../application/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const user = await this.usersService.register(body.email, body.password);

    return { id: user.id, email: user.email };
  }
}
