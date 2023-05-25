import {
    Controller,
    Get,
    Param,
    Post,
    Request,
    UseGuards,
    NotFoundException,
    ForbiddenException
} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {VideosService} from "./videos.service";

@Controller("videos")
export class VideosController {
    constructor(private videosService: VideosService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("/")
    async list(@Request() req, @Param() params) {
        const videos = await this.videosService.list({
            take: 100,
            where: {ownerId: req.ownerId},
            orderBy: {
                createdAt: "desc"
            }
        });

        return videos;
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async one(@Request() req, @Param() params) {
        const video = await this.videosService.one({id: +params.id});
        if (video === null) {
            throw new NotFoundException();
        }

        return video;
    }
}
