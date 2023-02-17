import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserController } from './user.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UsersService],
})
export class UserModule {}
