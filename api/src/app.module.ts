import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";
import {StreamsModule} from "./streams/streams.module";
import {IngesterModule} from "./ingester/ingester.module";
import {VideosModule} from "./videos/videos.module";

@Module({
    imports: [
        AuthModule,
        UsersModule,
        StreamsModule,
        VideosModule,
        IngesterModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
