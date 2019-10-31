import { Injectable } from "@nestjs/common";
import { Room } from "../models/room.model";

@Injectable()
export class RoomRepository {
    async checkAvailability(id: string, date: Date): Promise<Room>{
            //todo: ler do banco
            return new Room('123123');
    }
    async book(room: Room){
         //TODO: salvar no banco
    }
}