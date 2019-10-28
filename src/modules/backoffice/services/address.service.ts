import { Injectable, HttpService } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Addres } from "../valueObjects/address.vo";
import { CustomerModel } from "../models/customer.model";
import { AddressType } from "../enums/address-type";


@Injectable()
export class AddressService {
    constructor(@InjectModel('Customer') private readonly model: Model<CustomerModel>,
                private readonly httpService: HttpService) { }

    async addAddress(document: string, data: Addres, type: AddressType): Promise<CustomerModel> {
        const options = { upsert: true };
        if (type == AddressType.Billing) {
            return await this.model.findOneAndUpdate({ document },
                {
                    $set: {
                        billingAddress: data
                    }

                }, options
            );
        }else if(type == AddressType.Shipping){
            return await this.model.findOneAndUpdate({ document },
                {
                    $set: {
                        shippingAddress: data
                    }

                }, options
            );
        }

    }

    getAddressByZipCode(zipcode: string){
        const url = `https://viacep.com.br/ws/${zipcode}/json`;
        return this.httpService.get(url);
    }
}