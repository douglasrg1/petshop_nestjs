import { Injectable } from "@nestjs/common";
import { AccountService } from "../../modules/backoffice/services/account.service";
import {JwtService} from '@nestjs/jwt'
import { JwtPayLoad } from "../interfaces/jwt-payload.interface";


@Injectable()
export class AuthService{
    constructor(private readonly accountService: AccountService,private readonly jwtService: JwtService){}

    async createToken(){
        const user: JwtPayLoad = {
            document: '123123',
            email: 'teste',
            image: 'teste.png',
            roles: ['admin']
        };
        const accessToken = this.jwtService.sign(user);
        return {expiresIn: 3600, accessToken,};

    }
    async validateUser(payload: JwtPayLoad): Promise<any>{
        return payload;
        //return await this.accountService.findByUserName(payload.document);
    }
}