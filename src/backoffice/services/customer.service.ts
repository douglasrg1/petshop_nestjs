import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { User } from '../models/user';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';
import { Addres } from '../valueObjects/address.vo';


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
}