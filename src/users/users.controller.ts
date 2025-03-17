import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    return this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() body: { fname: string; lname: string; username: string; email: string; password: string }) {
    return this.usersService.createUser(
      body.fname, 
      body.lname, 
      body.username, 
      body.email, 
      body.password
    );
  }
}
