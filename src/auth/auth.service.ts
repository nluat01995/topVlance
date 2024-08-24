import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthConstants } from './constants/auth.constant';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService,
    private jwtService: JwtService
  ) { }

  async login(createUserDto: CreateUserDto) {
    const user = await this.userService.login(createUserDto);
    try {
      if (!user) {
        return {
          code: AuthConstants.FAILED.CODE,
          message: AuthConstants.FAILED.MESSAGE,
          data: []
        }
      }
      const { password, ...result } = user;
      const payload = { userId: result.id, email: result.email, role: result.role }
      const token = await this.jwtService.signAsync(payload)
      return {
        message: AuthConstants.SUCCESS.MESSAGE,
        code: AuthConstants.SUCCESS.CODE,
        data: [
          {
            access_token: token
          }
        ]
      };
    } catch (error) {
      return {
        status: AuthConstants.ERROR.CODE,
        message: AuthConstants.ERROR.MESSAGE,
        data: []
      }
    }

  }
  async register(createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }
}
