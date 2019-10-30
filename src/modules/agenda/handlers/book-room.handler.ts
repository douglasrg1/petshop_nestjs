import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BookRoomCommand } from "../commands/book-room.command";
import { RoomRepository } from "../repositories/romm.repository";

@CommandHandler(BookRoomCommand)
export class BookRoomhandler implements ICommandHandler<BookRoomCommand>{

    constructor(private readonly repository: RoomRepository){};

    async execute(command: BookRoomCommand) {
        console .log('executando o comando');
        const room = await this.repository.findOneById(command.roomId);
        room.book(command.customerId);
        
    }

}