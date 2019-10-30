import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AgendaController } from './controllers/agenda.controller';
import { RoomBookService } from './services/room-book.service';
import { RoomRepository } from './repositories/romm.repository';
import { BookRoomCommand } from './commands/book-room.command';
import { RoomBookedhandler } from './events/handlers/room-blocked.hadler';

@Module({
    imports: [CqrsModule],
    controllers: [AgendaController],
    providers: [
        RoomBookService,
        RoomRepository,
        BookRoomCommand,
        RoomBookedhandler

    ]
})
export class AgendaModule {}
