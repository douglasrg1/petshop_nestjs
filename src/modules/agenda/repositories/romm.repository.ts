import { Injectable } from "@nestjs/common";
import { Room } from "../models/room.model";

@Injectable()
export class RoomRepository {
    async findOneById(id: string): Promise<Room> {
        console.log('recuperando sala');
        return new Room('12314');
    }
}