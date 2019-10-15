import { Controller, Get, Param, HttpException, HttpStatus, Post, Body } from "@nestjs/common";
import { OrderService } from "../services/order.service";
import { OrderItemService } from "../services/order-item.service";
import { ProductService } from "../services/product.service";
import { ResultModel } from "src/modules/backoffice/models/result.model";
import { Order } from "../entities/order.entity";
import { OrderItemDto } from "../dtos/Order-item.dto";
import { OrderItem } from "../entities/order-item.entity";


@Controller('v1/orders')
export class OrderController{
    constructor(private readonly orderService: OrderService,
        private readonly orderItemService: OrderItemService,
        private readonly productService: ProductService){}

    @Get(':order')
    async getByOrder(@Param('order') number: string){
        try {
            const order = await this.orderService.getByNumber(number);
            return new ResultModel(null,true,order,null);
        } catch (error) {
            throw new HttpException( new ResultModel("Erro ao listar os pedidos",false,null,error),
            HttpStatus.BAD_REQUEST);
        }
    }
    @Get(':customer')
    async getByCustomer(@Param('customer') customer: string){
        try {
            const order = await this.orderService.getByNumber(customer);
            return new ResultModel(null,true,order,null);
        } catch (error) {
            throw new HttpException( new ResultModel("Erro ao listar os pedidos",false,null,error),
            HttpStatus.BAD_REQUEST);
        }
    }
    @Post()
    async post(@Body() model: OrderItemDto[]){
        try {
            let order = new Order();
            order.customer = "123123123";
            order.date = new Date();
            order.number = "asdf234234";
            order.items = [];
            await this.orderService.post(order);

            for(const item of model){
                let product = await this.productService.getById(item.productId);
                let orderItem = new OrderItem();
                orderItem.order = order;
                orderItem.product = product;
                orderItem.price = product.price;
                orderItem.quantity = item.quantity;
                await this.orderItemService.post(orderItem);
                return new ResultModel(null,true,model,null);
            }

        } catch (error) {
            throw new HttpException( new ResultModel("Erro ao listar os pedidos",false,null,error),
            HttpStatus.BAD_REQUEST);
        }
    }
    
}