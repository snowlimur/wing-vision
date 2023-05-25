import {Injectable} from "@nestjs/common";
import {PrismaService} from "../db/prisma.service";
import {Video, Prisma} from "@prisma/client";

@Injectable()
export class VideosService {
    constructor(private prisma: PrismaService) {
    }

    async one(
        videoWhereUniqueInput: Prisma.VideoWhereUniqueInput
    ): Promise<Video | null> {
        return this.prisma.video.findUnique({
            where: videoWhereUniqueInput
        });
    }

    async list(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.VideoWhereUniqueInput;
        where?: Prisma.VideoWhereInput;
        orderBy?: Prisma.VideoOrderByWithRelationInput;
    }): Promise<Video[]> {
        const {skip, take, cursor, where, orderBy} = params;
        return this.prisma.video.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include: {
                stream: true,
            },
        });
    }

    async delete(where: Prisma.VideoWhereUniqueInput): Promise<Video> {
        return this.prisma.video.delete({
            where
        });
    }
}
