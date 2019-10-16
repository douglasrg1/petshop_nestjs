import { Injectable } from "@nestjs/common";
import { AccountService } from "../../modules/backoffice/services/account.service";
import {JwtService} from '@nestjs/jwt'
import { JwtPayLoad } from "../interfaces/jwt-payload.interface";


@Injectable()
export class AuthService{
    constructor(private readonly accountService: AccountService,private readonly jwtService: JwtService){}

    async createToken(){
        const user: JwtPayLoad = {username: 'test@gmail.com'};
        const accessToken = this.jwtService.sign(user);
        return {expiresIn: 3600, accessToken,};

    }
    async validateUser(payload: JwtPayLoad): Promise<any>{
        return await this.accountService.findByUserName(payload.username);
    }
}