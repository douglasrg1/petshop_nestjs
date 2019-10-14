import { ModelContract } from "../model.contract";
import { Flunt } from "../../../../utils/flunt";
import { Injectable } from "@nestjs/common";
import { CreditCard } from "../../valueObjects/creditCard.vo";

@Injectable()
export class CreditCardContract implements ModelContract{
    errors: any[];
    validate(model: CreditCard): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.holder, 5,'Nome do cartão inválido');
        flunt.isFixedLen(model.number,16,"Número do cartão inválido");
        flunt.isFixedLen(model.expiration,4,"Data de expiração do cartão inválida");

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}