import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { User } from '../models/user';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';
import { Addres } from '../valueObjects/address.vo';
import { PetModel } from '../models/pet.model';


@Injectable()
export class CustomerService {

    constructor(@InjectModel('Customer') private readonly model: Model<User>) {

    }
    async create(data: CustomerModel): Promise<CustomerModel> {
        const user = new this.model(data);
        return await user.save();
    }
    async addBillingAddress(document: string, data: Addres): Promise<CustomerModel> {
        const options = { upsert: true };
        return await this.model.findOneAndUpdate({ document },
            {  
                $set:{
                    billingAddress: data
                }

            },options);
    }
    async addShippingAddress(document: string, data: Addres): Promise<CustomerModel> {
        const options = { upsert: true };
        return await this.model.findOneAndUpdate({ document },
            {  
                $set:{
                    shippingAddress: data
                }

            },options);
    }
    async createPet(document: string, data: PetModel): Promise<CustomerModel> {
        const options = { upsert: true, new: true };
        return await this.model.findOneAndUpdate({ document },
            {  
                $push:{
                    pets: data
                }

            },options);
    }
    async updatePate(document: string,id: string, data: PetModel): Promise<CustomerModel> {
        
        return await this.model.findOneAndUpdate({ document,'pets._id': id },
            {  
                $set:{
                    'pets.$': data
                }

            });
    }
    async findAll():Promise<CustomerModel[]>{
        return await this.model.find({},'name email document').sort('name').exec();
    }
    async find(document: string):Promise<CustomerModel>{
        return await this.model.find({document}).populate('user', 'username').exec();
    }
}