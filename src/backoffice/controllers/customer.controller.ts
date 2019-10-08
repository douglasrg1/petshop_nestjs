import { Controller, Post, Put, Delete, Get, Param, Body, UseInterceptors } from "@nestjs/common";
import { ResultModel } from "../models/result.model";
import { ValidatorInterceptor } from "../../interceptors/validator.interceptor";
import { CustomerContract } from "../contracts/customer.contracts";
import { CreateCustomerDto } from "../dtos/create-customer-dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user";

@Controller('v1/customers')
export class CustomerController{

    constructor(private readonly accountService: AccountService){}

    @Get()
    get(){
        return new ResultModel(null,true,null,null);
    }
    @Get(':document')
    getById(@Param('document') documento: string){
        return new ResultModel(null,true,null,null);
    }
    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CustomerContract()))
    async post(@ Body() body: CreateCustomerDto){
        const user = await this.accountService.create(new User(body.document,body.password,true));

        return new ResultModel('cliente criado com sucesso',true,user,null)
    }
    @Put(':document')
    put(@Param('document') documento: string,@Body() body: CreateCustomerDto){
        return new ResultModel('cliente alterado com sucesso',true,body,null)
    }
    @Delete(':document')
    delete(@Param('document') documento: string){
        return new ResultModel(`cliente ${documento} removido com sucesso`,true,null,null);
    }
}