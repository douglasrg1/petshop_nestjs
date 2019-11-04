import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import { AuthService } from "../services/auth.service";
import { JwtPayLoad } from "../interfaces/jwt-payload.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '54147f5ce0d2'
        });
    }

    async validate(payload: JwtPayLoad){
        const user = await this.authService.validateUser(payload);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}