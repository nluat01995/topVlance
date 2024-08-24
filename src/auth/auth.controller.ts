import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public, Roles } from 'src/rbac/roles.decorator';
import { RolesGuard } from 'src/rbac/guards/roles.guard';
import { JwtAuthGuard } from 'src/rbac/guards/auth.guard';
import { Role } from 'src/rbac/enums/role.enum';
import * as _ from 'lodash';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signIn')
  @Public()
  signIn(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Post('signUp')
  @Public()
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.FREELANCER, Role.ADMIN) // Only Admin and SuperAdmin can access this route
  findAll(@Req() req: Request) {
    return 'This route is only accessible by Admins and SuperAdmins';
  }


}
