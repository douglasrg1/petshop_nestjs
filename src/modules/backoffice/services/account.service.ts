import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { User } from '../models/user';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class AccountService{

    constructor(@InjectModel('User') private readonly model: Model<User>) {

    }
    async create(data: User): Promise<User>{
        const user = new this.model(data);
        return await user.save();
    }
    async findByUserName(username: string){
        return new User(username,"123123123",true);
    }
}