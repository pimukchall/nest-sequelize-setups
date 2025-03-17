import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validate user by username or email
   */
  async validateUser(usernameOrEmail: string, password: string): Promise<Partial<User>> {
    const user = await this.usersService.findByEmailOrUsername(usernameOrEmail);

    if (!user) {
      console.log('❌ User not found!');
      throw new UnauthorizedException('Invalid username/email or password');
    }

    console.log('✅ User found:', user.toJSON());
    console.log('Stored password:', user.password ?? '❌ No password stored!');

    if (!user.password || user.password.trim() === '') {
      console.log('❌ Password is missing in database!');
      throw new UnauthorizedException('Invalid username/email or password');
    }

    // เปรียบเทียบรหัสผ่านที่รับเข้ามากับรหัสผ่านที่เก็บในฐานข้อมูล
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔍 Password match:', isMatch);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid username/email or password');
    }

    // คืนค่า user โดยไม่รวม password
    const { password: _, ...result } = user.toJSON();
    return result as Partial<User>;
  }

  /**
   * Login function that generates JWT token
   */
  async login(user: Partial<User>) {
    const payload = { email: user.email, username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
