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
import { StreamsService } from "../streams/streams.service";

@Controller("ingester")
export class IngesterController {
  constructor(private streamsService: StreamsService) {
  }

  @Get("on-publish/:key")
  async callback(@Param() params) {
    const stream = await this.streamsService.one({ key: params.key });
    if (stream === null) {
      throw new NotFoundException();
    }

    return stream;
  }
}
