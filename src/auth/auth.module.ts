import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from 'src/constant/constant';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/rbac/strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANT.secret,
      signOptions: { expiresIn: '60m' },
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
