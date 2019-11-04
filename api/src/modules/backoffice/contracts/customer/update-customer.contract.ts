import { ModelContract } from "../model.contract";
import { Flunt } from "../../../../utils/flunt";
import { Injectable } from "@nestjs/common";
import { UpdateCustomerDto } from "../../dtos/customer/update-customer.dto";

@Injectable()
export class UpdateCustomerContract implements ModelContract{
    errors: any[];
    validate(model: UpdateCustomerDto): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.name, 5,'Nome inválido');
        flunt.hasMaxLen(model.name,40,"Nome excede maxímo de caracteres");

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}