import { Module } from "@nestjs/common";
import { DBModule } from "../db/db.module";
import { IngesterController } from "./ingester.controller";
import { StreamsModule } from "../streams/streams.module";

@Module({
  imports: [DBModule, StreamsModule],
  controllers: [IngesterController],
})

export class IngesterModule {
}
