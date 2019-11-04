import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';
import { QueryDto } from '../dtos/query.dto';
import { UpdateCustomerDto } from '../dtos/customer/update-customer.dto';
import { CreditCard } from '../valueObjects/creditCard.vo';


@Injectable()
export class CustomerService {

    constructor(@InjectModel('Customer') private readonly model: Model<CustomerModel>) {

    }
    async create(data: CustomerModel): Promise<CustomerModel> {
        const user = new this.model(data);
        return await user.save();
    }
    async update(document: string, data: UpdateCustomerDto): Promise<CustomerModel> {
        return await this.model.findOneAndUpdate({document}, data);
    }
    async findAll(): Promise<CustomerModel[]> {
        return await this.model.find({}, 'name email document').sort('name').exec();
    }
    async find(document: string): Promise<CustomerModel> {
        return await this.model.find({ document }).populate('user', 'username').exec();
    }
    async saveOrUpdateCreditCard(document: string,data: CreditCard): Promise<CustomerModel> {
        const options = {upsert: true};

        return await this.model.findOneAndUpdate({document},{
            $set: {
                card: data
            }
        },options);
    }
    //deixa a aplicação fazer uma query de preferencia para busca no banco.
    async query(model: QueryDto): Promise<CustomerModel> {
        return await this.model.find(model.query, model.field, { skip: model.skip, limit: model.take })
            .sort(model.sort).exec();
    }

}