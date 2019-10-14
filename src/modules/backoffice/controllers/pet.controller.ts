import { Controller, Post, Put, Param, Body, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { ResultModel } from "../models/result.model";
import { ValidatorInterceptor } from "../../../interceptors/validator.interceptor";
import { CreatePetContract } from "../contracts/pet/create-pet.contract";
import { PetModel } from "../models/pet.model";
import { PetService } from "../services/pets.service";

@Controller('v1/pets')
export class PetController {

    constructor(private readonly petService: PetService) { }

    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async addPets(@Param('document') document, @Body() model: PetModel) {
        try {
            await this.petService.createPet(document, model);
            return new ResultModel('Pet adicionado com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new ResultModel('Não foi possivel adicionar seu pet', false, null,
                error), HttpStatus.BAD_REQUEST)
        }
    }
    @Put(':document/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePets(@Param('document') document,@Param('id') id, @Body() model: PetModel) {
        try {
            await this.petService.updatePate(document,id, model);
            return new ResultModel('Pet atualizado com sucesso', true, model, null)

        } catch (error) {
            throw new HttpException(new ResultModel('Não foi possivel adicionar seu pet', false, null,
                error), HttpStatus.BAD_REQUEST)
        }
    }

}