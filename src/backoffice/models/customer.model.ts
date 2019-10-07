import { PetModel } from "./pet.model";
import { Addres } from "../valueObjects/address.vo";
import { CreditCard } from "../valueObjects/creditCard.vo";

export class CustomerModel{
    
    constructor(public name: string, public document: string, public email: string,public password: string,
        public active: boolean,public pets: PetModel[],public billingAddress: Addres, shippingAddress: Addres,
        public creditCard: CreditCard) {
        
    }
}