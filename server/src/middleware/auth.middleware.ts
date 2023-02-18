import * as jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from '../users/user.model';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  public async use(req, res, next) {
    if (
      req.headers.authorization &&
      (req.headers.authorization as string).split(' ')[0] === 'Bearer'
    ) {
      const token = (req.headers.authorization as string).split(' ')[1];
      const decoded: any = jwt.verify(token, 'secretKey');
      const user = await User.findOne<User>({
        where: {
          id: decoded.id,
          email: decoded.email,
        },
      });
      if (!user) throw new Error('request:unauthorized');
      res.user = user;
      next();
    } else {
      throw new Error('request:unauthorized');
    }
  }
}