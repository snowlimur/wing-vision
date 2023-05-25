import { Module } from "@nestjs/common";
import { StreamsService } from "./streams.service";
import { DBModule } from "../db/db.module";
import { StreamsController } from "./streams.controller";

@Module({
  imports: [DBModule],
  controllers: [StreamsController],
  providers: [StreamsService],
  exports: [StreamsService]
})

export class StreamsModule {
}
