import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { JWT_CONSTANT } from 'src/constant/constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_CONSTANT.secret, // Replace with your secret key
        } as StrategyOptions);
    }

    async validate(payload) {
        // console.log('JWT payload:', payload); // Check the payload here

        // Validate the JWT payload and return the user object
        // You can query your database here to find the user based on the payload
        // For simplicity, we'll just return the payload as the user
        return { userId: payload.userId, email: payload.email, role: payload.role };
    }
}
