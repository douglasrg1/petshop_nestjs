import { Controller, Get, UseGuards, Post, Req, UseInterceptors, Body, HttpException, HttpStatus } from "@nestjs/common";
import { AuthService } from "../../../shared/services/auth.service";
import { JwtAuthGuard } from "../../../shared/guards/auth.guard";
import { RoleInterceptor } from "../../../shared/interceptors/role.interceptor";
import { AccountService } from "../services/account.service";
import { AuthenticateDto } from "../dtos/account/authenticate.dto";
import { ResultModel } from "../models/result.model";
import { ResetPasswordDto } from "../dtos/account/reset-password.dto";
import {Guid} from 'guid-typescript';
import { ChangePasswordDto } from "../dtos/account/change-password.dto";


@Controller('v1/accounts')
export class AccountController{
    constructor(private authService: AuthService, private accountService: AccountService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(new RoleInterceptor(['admin']))
    findAll(@Req() request){
        return [];
    }
    @Post('authenticate')
    async authenticate(@Body() model: AuthenticateDto): Promise<any>{
        const customer = await this.accountService.authenticate(model.username,model.password);

        if(!customer)
            throw new HttpException(new ResultModel("Usuário ou senha inválidos",false,null,null),
                HttpStatus.UNAUTHORIZED);

        if(!customer.user.active)
            throw new HttpException( new ResultModel("Usuário inativo",false,null,null),
                HttpStatus.UNAUTHORIZED);

        const token = await this.authService.createToken(customer.document,customer.email,'',
            customer.user.roles);

        return new ResultModel(null,true,token,null);
    }
    @Post('reset-password')
    async resetPassword(@Body() model: ResetPasswordDto): Promise<any>{
        try {
            const password = Guid.create().toString().substring(0,8).replace("-","");
            await this.accountService.update(model.document, {password: password});
            return new ResultModel("Uma nova senha foi enviada para seu E-mail",true,null,null);
        } catch (error) {
            throw new HttpException( new ResultModel("Não foi possível restaurar a sua senha",false,null,null),
                HttpStatus.BAD_REQUEST);
        }
    }
    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any>{
        try {
            await this.accountService.update(request.user.document, {password: model.pass});
            return new ResultModel("Sua senha foi alterada com sucesso",true,null,null);
        } catch (error) {
            throw new HttpException( new ResultModel("Não foi possível alterar sua senha",false,null,null),
                HttpStatus.BAD_REQUEST);
        }
    }
    @Post('refresh')
    @UseGuards(JwtAuthGuard)
    async refreshToken(@Req() request): Promise<any>{
        const token = await this.authService.createToken(request.user.document, request.user.email,'',
                request.user.roles);
        
        return new ResultModel(null,true,token,null);
    }
}