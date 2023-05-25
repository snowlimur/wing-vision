import { Injectable } from "@nestjs/common";
import { PrismaService } from "../db/prisma.service";
import { Stream, Prisma, StreamType } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class StreamsService {
  constructor(private prisma: PrismaService) {
  }

  async one(
    streamWhereUniqueInput: Prisma.StreamWhereUniqueInput
  ): Promise<Stream | null> {
    return this.prisma.stream.findUnique({
      where: streamWhereUniqueInput
    });
  }

  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.StreamWhereUniqueInput;
    where?: Prisma.StreamWhereInput;
    orderBy?: Prisma.StreamOrderByWithRelationInput;
  }): Promise<Stream[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.stream.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  async createPush(ownerId: number, title: string): Promise<Stream> {
    let model: Prisma.StreamUncheckedCreateInput = {
      ownerId: ownerId,
      title: title,
      type: StreamType.PUSH,
      key: uuidv4(),
      active: true,
    };

    return this.prisma.stream.create({
      data: model
    });
  }

  async createPull(ownerId: number, title: string, rtmp: string): Promise<Stream> {
    let model: Prisma.StreamUncheckedCreateInput = {
      ownerId: ownerId,
      title: title,
      type: StreamType.PULL,
      rtmp: rtmp
    };

    return this.prisma.stream.create({
      data: model
    });
  }

  async update(params: {
    where: Prisma.StreamWhereUniqueInput;
    data: Prisma.StreamUpdateInput;
  }): Promise<Stream> {
    const { where, data } = params;
    return this.prisma.stream.update({
      data,
      where
    });
  }

  async delete(where: Prisma.StreamWhereUniqueInput): Promise<Stream> {
    return this.prisma.stream.delete({
      where
    });
  }
}
