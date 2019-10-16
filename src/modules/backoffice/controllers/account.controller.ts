import { Controller, Get, UseGuards, Post } from "@nestjs/common";
import { AuthService } from "../../../shared/services/auth.service";
import { JwtAuthGuard } from "../../../shared/guards/auth.guard";


@Controller('v1/accounts')
export class AccountController{
    constructor(private authService: AuthService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(){
        return [];
    }
    @Post()
    async createToken(): Promise<any>{
        return await this.authService.createToken();
    }
}