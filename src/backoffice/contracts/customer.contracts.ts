import { ModelContract } from "./model.contract";
import { CustomerModel } from "../models/customer.model";
import { Flunt } from "src/utils/flunt";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerContract implements ModelContract{
    errors: any[];
    validate(model: CustomerModel): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.name, 5,'Nome inválido');
        flunt.hasMaxLen(model.name,40,"Nome excede maxímo de caracteres");
        flunt.isEmail(model.email,"E-mail inválido");
        flunt.isFixedLen(model.document,11,"cpf inválido");

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}