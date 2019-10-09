import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';
import { QueryDto } from '../dtos/query.dto';


@Injectable()
export class CustomerService {

    constructor(@InjectModel('Customer') private readonly model: Model<CustomerModel>) {

    }
    async create(data: CustomerModel): Promise<CustomerModel> {
        const user = new this.model(data);
        return await user.save();
    }
    async findAll(): Promise<CustomerModel[]> {
        return await this.model.find({}, 'name email document').sort('name').exec();
    }
    async find(document: string): Promise<CustomerModel> {
        return await this.model.find({ document }).populate('user', 'username').exec();
    }
    //deixa a aplicação fazer uma query de preferencia para busca no banco.
    async query(model: QueryDto): Promise<CustomerModel> {
        return await this.model.find(model.query, model.field, { skip: model.skip, limit: model.take })
            .sort(model.sort).exec();
    }

}