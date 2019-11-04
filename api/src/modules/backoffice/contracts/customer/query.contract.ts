import { Injectable } from "@nestjs/common";
import { ModelContract } from "../model.contract";
import { Flunt } from "../../../../utils/flunt";
import { QueryDto } from "../../dtos/query.dto";

@Injectable()
export class QueryContract implements ModelContract{
    errors: any[];
    validate(model: QueryDto): boolean {
        
        const flunt = new Flunt();

        if(!model.query)
            model.query = {};
            
        flunt.isLowerThan(model.take,500,"O número de registros na busca excede o maximo de 500 registros por requisição");

        this.errors = flunt.errors;
        return flunt.isValid();
    }


}