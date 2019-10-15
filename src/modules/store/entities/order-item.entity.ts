import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";


@Entity()
export class OrderItem{

    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=>Order, (order)=> order.items)
    order: Order;
    @ManyToOne(()=>Product, (product)=>product)
    product: Product;
    @Column('decimal')
    price: number;
    @Column('decimal')
    quantity: number
}