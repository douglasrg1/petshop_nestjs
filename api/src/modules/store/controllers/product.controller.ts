import { Controller, HttpException, HttpStatus, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { ResultModel } from "../../../modules/backoffice/models/result.model";
import { Product } from "../entities/product.entity";

@Controller('v1/products')
export class ProductController{
    constructor(private readonly service: ProductService){}

    @Get()
    async get(){
        try {
            const products = await this.service.get();
            return new ResultModel(null,true,products,null);

        } catch (error) {
            throw new HttpException(new ResultModel("Erro ao realizar pesquisa",false,null,error),
            HttpStatus.BAD_REQUEST)
        }
    }
    @Post()
    async post (@Body() model: Product){
        try {
            await this.service.post(model);
            return new ResultModel(null,true,model,null);

        } catch (error) {
            throw new HttpException(new ResultModel("Erro ao cadastrar produto",false,null,error),
            HttpStatus.BAD_REQUEST);
        }
    }
    @Put(':id')
    async put(@Param('id') id, @Body() model: Product){
        try {
            await this.service.put(id,model);
            return new ResultModel(null,true,model,null)
        } catch (error) {
            
        }
    }
    @Delete(':id')
    async delete(@Param('id') id){
        try {
            await this.service.delete(id);
            return new ResultModel("Registro removido com sucesso",true,null,null);
        } catch (error) {
            throw new HttpException( new ResultModel("Erro ao remover o registro",false,null,error),
            HttpStatus.BAD_REQUEST);
        }
    }
}