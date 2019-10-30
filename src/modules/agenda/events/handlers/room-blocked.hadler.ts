import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { RoomBookedEvent } from "../room-booked.event";

@EventsHandler(RoomBookedEvent)
export class RoomBookedhandler implements IEventHandler<RoomBookedEvent>{
    handle(event: RoomBookedEvent) {
        console.log('Manipulando o evento room booked');
    }

}