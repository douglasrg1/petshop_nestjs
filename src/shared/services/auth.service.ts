import { Injectable } from "@nestjs/common";
import { AccountService } from "../../modules/backoffice/services/account.service";
import {JwtService} from '@nestjs/jwt'
import { JwtPayLoad } from "../interfaces/jwt-payload.interface";


@Injectable()
export class AuthService{
    constructor(private readonly accountService: AccountService,private readonly jwtService: JwtService){}

    async createToken(document:string,email:string,image:string,roles:string[]){
        const user: JwtPayLoad = {
            document: document,
            email: email,
            image: image,
            roles: roles
        };
        return this.jwtService.sign(user);

    }
    async validateUser(payload: JwtPayLoad): Promise<any>{
        return payload;
        //return await this.accountService.findByUserName(payload.document);
    }
}