import { ModelContract } from "../model.contract";
import { Flunt } from "../../../utils/flunt";
import { Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "../../dtos/create-customer-dto";

@Injectable()
export class CustomerContract implements ModelContract{
    errors: any[];
    validate(model: CreateCustomerDto): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.name, 5,'Nome inválido');
        flunt.hasMaxLen(model.name,40,"Nome excede maxímo de caracteres");
        flunt.isEmail(model.email,"E-mail inválido");
        flunt.isFixedLen(model.document,11,"cpf inválido");
        flunt.hasMinLen(model.name, 6,'Nome inválido');

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}