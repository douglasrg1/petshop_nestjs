import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { User } from '../models/user';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerModel } from '../models/customer.model';
import { Md5 } from 'md5-typescript';
import { ConfigService } from '../../../modules/config/services/config.service';


@Injectable()
export class AccountService{

    constructor(@InjectModel('User') private readonly usermodel: Model<User>,
                @InjectModel('Customer') private readonly customermodel: Model<CustomerModel>,
                private readonly config: ConfigService) {

    }
    async create(data: User): Promise<User>{
        const user = new this.usermodel(data);
        return await user.save();
    }
    async findByUserName(username: string){
        return new User(username,"123123123",true,[]);
    }
    async authenticate (username: string, password: string): Promise<CustomerModel>{
        let customer =  await this.customermodel.findOne({ document: username})
            .populate('user','-password').exec();

        const pass = await Md5.init(`${password}${this.config.get("HASH_KEY")}`);

        if(pass.toString() == customer.user.password.toString()){
            return customer;
        }else{
            return null;
        }
    }
    async update (username: string, data: any): Promise<CustomerModel>{
        return await this.usermodel.findOneAndUpdate({username}, data);
    }
}