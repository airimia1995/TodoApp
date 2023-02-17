import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Res() response, @Body() user: User) {
    const newUser = await this.userService.createUser(user);
    delete newUser.password;
    return response.status(HttpStatus.CREATED).json({
      newUser,
    });
  }

  @Get()
  async fetchAll(@Res() response) {
    const users = await this.userService.findAll();
    return response.status(HttpStatus.OK).json({
      users,
    });
  }
}
