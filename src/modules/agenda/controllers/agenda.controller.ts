import { Controller, Post, Body, UseGuards, Req, HttpException, HttpStatus } from "@nestjs/common";
import { RoomBookService } from "../services/room-book.service";
import { JwtAuthGuard } from "../../../shared/guards/auth.guard";
import { BookRoomDto } from "../dtos/book-room.dto";
import { BookRoomCommand } from "../commands/book-room.command";
import { ResultModel } from "../../../modules/backoffice/models/result.model";


@Controller('v1/rooms')
export class AgendaController {

    constructor(private readonly service: RoomBookService) { };

    @Post()
    @UseGuards(JwtAuthGuard)
    async Book(@Req() request, @Body() body: BookRoomDto) {
        try {
            var command = new BookRoomCommand(request.user.document, body.roomId, body.date);
            await this.service.Book(command);
        } catch (error) {
            throw new HttpException(new ResultModel('Não foi possivel reservar sua sala', false, null, error),
                HttpStatus.BAD_REQUEST);
        }
    }
}