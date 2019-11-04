import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BookRoomCommand } from "../commands/book-room.command";
import { RoomRepository } from "../repositories/romm.repository";
import { HttpException, HttpStatus } from "@nestjs/common";

@CommandHandler(BookRoomCommand)
export class BookRoomhandler implements ICommandHandler<BookRoomCommand>{

    constructor(private readonly repository: RoomRepository){};

    async execute(command: BookRoomCommand) {
        
        const room = await this.repository.checkAvailability(command.roomId,command.date);

        if(room){
            room.book(command.customerId,command.date);
            await this.repository.book(room);
            return;
        }

        throw new HttpException("Sala não disponivel",HttpStatus.BAD_REQUEST);
        
        
    }

}