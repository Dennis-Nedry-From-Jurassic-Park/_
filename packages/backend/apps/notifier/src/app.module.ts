import {Module} from '@nestjs/common';
import {ThresholdController} from "./app.controller";
import {ThresholdService} from "./app.service";
import {ThrottlerModule} from "@nestjs/throttler";

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 1000,
        }),
    ],
    controllers: [ThresholdController],
    providers: [ThresholdService],
})
export class ThresholdsModule {}