import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { User } from '../models/user';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';


@Injectable()
export class AccountService{

    constructor(@InjectModel('User') private readonly usermodel: Model<User>,
                @InjectModel('Customer') private readonly customermodel: Model<CustomerModel>) {

    }
    async create(data: User): Promise<User>{
        const user = new this.usermodel(data);
        return await user.save();
    }
    async findByUserName(username: string){
        return new User(username,"123123123",true,[]);
    }
    async authenticate (username: string, password: string): Promise<CustomerModel>{
        return await this.customermodel.findOne({
            'user.username': username,
            'user.password': password
        }).populate('user','-password').exec();
    }
    async update (username: string, data: any): Promise<CustomerModel>{
        return await this.usermodel.findOneAndUpdate({username}, data);
    }
}