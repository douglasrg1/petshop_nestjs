import { Injectable } from "@nestjs/common";
import { ModelContract } from "../model.contract";
import { PetModel } from "../../../backoffice/models/pet.model";
import { Flunt } from "../../../utils/flunt";


@Injectable()
export class CreatePetContract implements ModelContract{
    errors: any[];

    validate(model: PetModel): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.name, 2, 'Nome inválido');
        flunt.hasMinLen(model.gender, 3, 'Gênero inválido');
        flunt.hasMinLen(model.type, 2, 'Tipo de animal inválido');
        flunt.hasMinLen(model.breed, 3, 'Raça inválida');

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}