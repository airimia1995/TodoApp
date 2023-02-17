import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { User } from '../users/user.model';
import { Injectable } from '@nestjs/common';

export interface IAuthService {
  options: IJwtOptions;
  sign(credentials: { email: string; password: string }): Promise<string>;
}

export interface IJwtOptions {
  algorithm: string;
  expiresIn: number | string;
  jwtid: string;
}

@Injectable()
export class AuthService implements IAuthService {
  private _options: IJwtOptions = {
    algorithm: 'HS256',
    expiresIn: '2 days',
    jwtid: 'jsonwebtoken',
  };

  get options(): IJwtOptions {
    return this._options;
  }

  set options(value: IJwtOptions) {
    this._options.algorithm = value.algorithm;
  }

  public async sign(credentials: {
    email: string;
    password: string;
  }): Promise<string> {

    const user = await User.findOne<User>({
      where: {
        email: credentials.email,
        password: crypto
          .createHmac('sha256', credentials.password)
          .digest('hex'),
      },
    });
    if (!user) throw new Error('User not found');

    const payload = {
      id: user.id,
      email: user.email,
    };

    return jwt.sign(payload, 'secretKey');
  }
}
