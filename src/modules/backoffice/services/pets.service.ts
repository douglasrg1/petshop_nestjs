import { Injectable } from "@nestjs/common";
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";
import { PetModel } from "../models/pet.model";
import { CustomerModel } from "../models/customer.model";

@Injectable()
export class PetService{
    constructor(@InjectModel('Customer') private readonly model: Model<CustomerModel>){}

    async createPet(document: string, data: PetModel): Promise<CustomerModel> {
        const options = { upsert: true, new: true };
        return await this.model.findOneAndUpdate({ document },
            {
                $push: {
                    pets: data
                }

            }, options);
    }
    async updatePate(document: string, id: string, data: PetModel): Promise<CustomerModel> {

        return await this.model.findOneAndUpdate({ document, 'pets._id': id },
            {
                $set: {
                    'pets.$': data
                }

            });
    }
}