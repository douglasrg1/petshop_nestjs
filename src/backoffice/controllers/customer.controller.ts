import { Controller, Post, Put, Delete, Get, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { ResultModel } from "../models/result.model";
import { ValidatorInterceptor } from "../../interceptors/validator.interceptor";
import { CustomerContract } from "../contracts/customer/create-customer.contract";
import { CreateCustomerDto } from "../dtos/create-customer.dto";
import { AccountService } from "../services/account.service";
import { User } from "../models/user";
import { CustomerService } from "../services/customer.service";
import { CustomerModel } from "../models/customer.model";
import { Addres } from "../valueObjects/address.vo";
import { CreateAddressContract } from "../contracts/customer/create-address.contract";
import { CreatePetContract } from "../contracts/customer/create-pet.contract";
import { PetModel } from "../models/pet.model";
import { QueryDto } from "../dtos/query.dto";
import { QueryContract } from "../contracts/customer/query.contract";

@Controller('v1/customers')
export class CustomerController {

    constructor(private readonly accountService: AccountService,
        private readonly customerService: CustomerService) { }

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
            await this.customerService.addBillingAddress(document, model);
            return new ResultModel('documento adicionado com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new ResultModel('Não foi possivel adicionar seu endereço', false, null,
                error), HttpStatus.BAD_REQUEST)
        }
    }
    @Post(':document/addresses/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Addres) {
        try {
            await this.customerService.addShippingAddress(document, model);
            return new ResultModel('documento adicionado com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new ResultModel('Não foi possivel adicionar seu endereço', false, null,
                error), HttpStatus.BAD_REQUEST)
        }
    }
    @Post(':document/pets')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async addPets(@Param('document') document, @Body() model: PetModel) {
        try {
            await this.customerService.createPet(document, model);
            return new ResultModel('Pet adicionado com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new ResultModel('Não foi possivel adicionar seu pet', false, null,
                error), HttpStatus.BAD_REQUEST)
        }
    }
    @Put(':document/pets/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePets(@Param('document') document,@Param('id') id, @Body() model: PetModel) {
        try {
            await this.customerService.updatePate(document,id, model);
            return new ResultModel('Pet atualizado com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new ResultModel('Não foi possivel adicionar seu pet', false, null,
                error), HttpStatus.BAD_REQUEST)
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


}