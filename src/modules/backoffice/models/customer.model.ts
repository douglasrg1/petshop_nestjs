import { PetModel } from "./pet.model";
import { Addres } from "../valueObjects/address.vo";
import { CreditCard } from "../valueObjects/creditCard.vo";
import { User } from "./user";

export class CustomerModel {

    constructor(public name: string, public document: string, public email: string, public pets: PetModel[],
        public billingAddress: Addres, public shippingAddress: Addres, public creditCard: CreditCard,
        public user: User) {

    }
}