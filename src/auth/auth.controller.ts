import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body() body: { fname: string; lname: string; username: string; email: string; password: string }
  ) {
    return this.usersService.createUser(
      body.fname, 
      body.lname, 
      body.username, 
      body.email, 
      body.password
    );
  }
  
  @Post('login')
  async login(@Body() body: { usernameOrEmail: string; password: string }) {
    return this.authService.validateUser(body.usernameOrEmail, body.password)
      .then(user => this.authService.login(user));
  }
  
}
