import { Controller, Post, Get, Param, Body, UseInterceptors, HttpException, HttpStatus, Put } from "@nestjs/common";
import { ResultModel } from "../models/result.model";
import { ValidatorInterceptor } from "../../../interceptors/validator.interceptor";
import { CustomerContract } from "../contracts/customer/create-customer.contract";
import { CreateCustomerDto } from "../dtos/customer/create-customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user";
import { CustomerService } from "../services/customer.service";
import { CustomerModel } from "../models/customer.model";
import { QueryDto } from "../dtos/query.dto";
import { QueryContract } from "../contracts/customer/query.contract";
import { UpdateCustomerContract } from "../contracts/customer/update-customer.contract";
import { UpdateCustomerDto } from "../dtos/customer/update-customer.dto";
import { CreditCardContract } from "../contracts/customer/create-credit-card.contract";
import { CreditCard } from "../valueObjects/creditCard.vo";

@Controller('v1/customers')
export class CustomerController {

    constructor(private readonly accountService: AccountService,
        private readonly customerService: CustomerService) { }

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CustomerContract()))
    async post(@Body() model: CreateCustomerDto) {
        try {
            const user = await this.accountService.create(new User(model.document, model.password, true,['user']));
            const customer = await this.customerService.create(
                new CustomerModel(model.name, model.document, model.email, null, null, null, null, user)
            );

            return new ResultModel('cliente criado com sucesso', true, customer, null)
        } catch (error) {
            throw new HttpException(new ResultModel('erro ao salvar usuario', false, null, error),
                HttpStatus.BAD_REQUEST)
        }
    }
    @Put(":document")
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async Put(@Param(":document") document,@Body() model: UpdateCustomerDto) {
        try {
            await this.customerService.update(document,model);
            return new ResultModel('cliente atualizado com sucesso', true, model, null)
        } catch (error) {
            throw new HttpException(new ResultModel('erro ao salvar usuario', false, null, error),
                HttpStatus.BAD_REQUEST)
        }
    }
    @Get()
    async getAll(){
        return new ResultModel(null,true,await this.customerService.findAll(),null);
    }
    @Get(':document')
    async get(@Param('document') document: string){
        return new ResultModel(null,true,await this.customerService.find(document),null);
    }
    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto){
        const customer = await this.customerService.query(model);
        return new ResultModel(null,true,customer,null);
    }
    @Post(':document/credit-cards')
    @UseInterceptors(new ValidatorInterceptor(new CreditCardContract()))
    async createCreditCard(@Param(":document") document,@Body() model: CreditCard){
        try {
            await this.customerService.saveOrUpdateCreditCard(document,model);
            return new ResultModel("Cartão adicionado com sucesso",true,model,null);
            
        } catch (error) {
            throw new HttpException(new ResultModel("Falha ao adicionar o cartão de crédito",false,null,error),
            HttpStatus.BAD_REQUEST);
        }
    }


}