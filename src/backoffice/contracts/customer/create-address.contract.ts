import { ModelContract } from "../model.contract";
import { Flunt } from "../../../utils/flunt";
import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "../../dtos/create-customer.dto";
import { Addres } from "../../../backoffice/valueObjects/address.vo";

@Injectable()
export class CreateAddressContract implements ModelContract{
    errors: any[];
    validate(model: Addres): boolean {
        const flunt = new Flunt();
        
        flunt.isFixedLen(model.zipCode,8, 'CEP Inválido');
        flunt.hasMinLen(model.street,3, 'Rua Inválido');
        flunt.hasMinLen(model.neighborhood,3, 'Bairro Inválido');
        flunt.hasMinLen(model.city,3, 'Cidade Inválida');
        flunt.isFixedLen(model.state,2, 'Estado Inválido');
        flunt.hasMinLen(model.zipCode,3, 'País Inválido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}