import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  public async login(@Body() body, @Res() res) {
    if (!body) throw new Error('Missing body');
    if (!body.email) throw new Error('Missing Email');
    if (!body.password) throw new Error('Missing Password');

    const token = await this.authService.sign(body);
    res.status(HttpStatus.ACCEPTED).json('Bearer ' + token);
  }
}