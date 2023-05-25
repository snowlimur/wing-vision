import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Patch,
    Request,
    UseGuards,
    NotFoundException,
    ForbiddenException
} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {StreamsService} from "./streams.service";
import {UpdateStreamDto} from "./dto/update-stream.dto";
import {CreateStreamDto} from "./dto/create-stream.dto";
import {Prisma, StreamType} from "@prisma/client";

@Controller("streams")
export class StreamsController {
    constructor(private streamsService: StreamsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("/")
    async list(@Request() req, @Param() params) {
        const streams = await this.streamsService.list({
            where: {ownerId: req.ownerId}
        });

        return streams;
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async one(@Request() req, @Param() params) {
        const stream = await this.streamsService.one({id: +params.id});
        if (stream === null) {
            throw new NotFoundException();
        }

        return stream;
    }

    @Get("on-publish/:key")
    async callback(@Param() params) {
        return this.streamsService.one({key: params.key});
    }

    @UseGuards(JwtAuthGuard)
    @Post("")
    async create(@Request() req, @Body() dto: CreateStreamDto) {
        if (dto.type === StreamType.PUSH) {
            return this.streamsService.createPush(+req.user.id, dto.name);
        }

        return this.streamsService.createPull(+req.user.id, dto.name, dto.rtmp);
    }


    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    async update(@Request() req, @Param() params, @Body() dto: UpdateStreamDto) {
        const stream = await this.streamsService.one({id: +params.id});
        if (stream.ownerId !== +req.user.id) {
            throw new ForbiddenException();
        }

        // @todo validate

        return this.streamsService.update({
            where: {id: +params.id}, data: {title: dto.name}
        });
    }
}
