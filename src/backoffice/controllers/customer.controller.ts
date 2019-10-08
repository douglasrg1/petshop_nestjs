import { Controller, Post, Put, Delete, Get, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { ResultModel } from "../models/result.model";
import { ValidatorInterceptor } from "../../interceptors/validator.interceptor";
import { CustomerContract } from "../contracts/customer/create-customer.contract";
import { CreateCustomerDto } from "../dtos/create-customer-dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user";
import { CustomerService } from "../services/customer.service";
import { CustomerModel } from "../models/customer.model";
import { Addres } from "../valueObjects/address.vo";
import { CreateAddressContract } from "../contracts/customer/create-address.contract";

@Controller('v1/customers')
export class CustomerController {

    constructor(private readonly accountService: AccountService,
        private readonly customerService: CustomerService) { }

    @Get()
    get() {
        return new ResultModel(null, true, null, null);
    }
    @Get(':document')
    getById(@Param('document') documento: string) {
        return new ResultModel(null, true, null, null);
    }
    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(new User(model.document, model.password, true));
            const customer = await this.customerService.create(
                new CustomerModel(model.name, model.document, model.email, null, null, null, null, user)
            );

            return new ResultModel('cliente criado com sucesso', true, customer, null)
        } catch (error) {
            throw new HttpException(new ResultModel('erro ao salvar usuario', false, null, error),
                HttpStatus.BAD_REQUEST)
        }
    }
    @Post(':document/addresses/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Addres) {
        try {
            this.customerService.addBillingAddress(document, model);
            return model;

        } catch (error) {
            throw new HttpException(new ResultModel('Não foi possivel adicionar seu endereço', false, null,
                error), HttpStatus.BAD_REQUEST)
        }
    }
    @Put(':document')
    put(@Param('document') documento: string, @Body() body: CreateCustomerDto) {
        return new ResultModel('cliente alterado com sucesso', true, body, null)
    }
    @Delete(':document')
    delete(@Param('document') documento: string) {
        return new ResultModel(`cliente ${documento} removido com sucesso`, true, null, null);
    }
}