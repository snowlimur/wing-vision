import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { DBModule } from "../db/db.module";

@Module({
  imports: [DBModule],
  providers: [UsersService],
  exports: [UsersService]
})

export class UsersModule {
}
