import { Controller, Post, Put, Delete, Get, Param, Body, UseInterceptors } from "@nestjs/common";
import { CustomerModel } from "../models/customer.model";
import { ResultModel } from "../models/result.model";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { CustomerContract } from "../contracts/customer.contracts";

@Controller('v1/customers')
export class CustomerController{
    @Get()
    get(){
        return new ResultModel(null,true,null,null);
    }
    @Get(':document')
    getById(@Param('document') documento: string){
        return new ResultModel(null,true,null,null);
    }
    @Post()
    //@UseInterceptors(new ValidatorInterceptor(new CustomerContract()))
    post(@ Body() body: CustomerModel){
        return new ResultModel("cliente cadastrado com sucesso",true,body,null);
    }
    @Put(':document')
    put(@Param('document') documento: string,@Body() body: CustomerModel){
        return new ResultModel('cliente alterado com sucesso',true,body,null)
    }
    @Delete(':document')
    delete(@Param('document') documento: string){
        return new ResultModel(`cliente ${documento} removido com sucesso`,true,null,null);
    }
}