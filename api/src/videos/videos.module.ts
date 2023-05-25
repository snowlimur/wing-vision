import { Module } from "@nestjs/common";
import { VideosService } from "./videos.service";
import { DBModule } from "../db/db.module";
import { VideosController } from "./videos.controller";

@Module({
  imports: [DBModule],
  controllers: [VideosController],
  providers: [VideosService],
  exports: [VideosService]
})

export class VideosModule {
}
