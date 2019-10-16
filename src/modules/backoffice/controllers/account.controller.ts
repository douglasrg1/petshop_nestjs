import { Controller, Get, UseGuards, Post, Req, UseInterceptors } from "@nestjs/common";
import { AuthService } from "../../../shared/services/auth.service";
import { JwtAuthGuard } from "../../../shared/guards/auth.guard";
import { RoleInterceptor } from "../../../shared/interceptors/role.interceptor";


@Controller('v1/accounts')
export class AccountController{
    constructor(private authService: AuthService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(new RoleInterceptor(['admin']))
    findAll(@Req() request){
        return [];
    }
    @Post()
    async createToken(): Promise<any>{
        return await this.authService.createToken();
    }
}