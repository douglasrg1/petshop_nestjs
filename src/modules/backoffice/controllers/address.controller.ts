import { Controller, Post, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { ResultModel } from "../models/result.model";
import { ValidatorInterceptor } from "../../../interceptors/validator.interceptor";
import { Addres } from "../valueObjects/address.vo";
import { CreateAddressContract } from "../contracts/address/create-address.contract";
import { AddressService } from "../services/address.service";
import { AddressType } from "../enums/address-type";

@Controller('v1/addresses')
export class AddressController {

    constructor(private readonly addressService:AddressService) { }

    @Post(':document/billing')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Addres) {
        try {
            await this.addressService.addAddress(document, model,AddressType.Billing);
            return new ResultModel('documento adicionado com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new ResultModel('Não foi possivel adicionar seu endereço', false, null,
                error), HttpStatus.BAD_REQUEST)
        }
    }
    @Post(':document/shipping')
    @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Addres) {
        try {
            await this.addressService.addAddress(document, model,AddressType.Shipping);
            return new ResultModel('documento adicionado com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new ResultModel('Não foi possivel adicionar seu endereço', false, null,
                error), HttpStatus.BAD_REQUEST)
        }
    }


}