import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  async createUser(user: User): Promise<User> {
    const newUser = new User();
    newUser.fullName = user.fullName;
    newUser.email = user.email;
    newUser.password = crypto.createHmac('sha256', user.password).digest('hex');
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
}
