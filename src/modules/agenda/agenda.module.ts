import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AgendaController } from './controllers/agenda.controller';
import { RoomBookService } from './services/room-book.service';
import { RoomRepository } from './repositories/romm.repository';
import { BookRoomCommand } from './commands/book-room.command';
import { RoomBookedhandler } from './events/handlers/room-boocked.hadler';
import { BookRoomhandler } from './handlers/book-room.handler';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        CqrsModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secretOrPrivateKey: '54147f5ce0d2',
            signOptions: {
                expiresIn: 3600
            }
        }),
    ],
    controllers: [AgendaController],
    providers: [
        RoomBookService,
        RoomRepository,
        BookRoomhandler,
        RoomBookedhandler

    ]
})
export class AgendaModule {}
