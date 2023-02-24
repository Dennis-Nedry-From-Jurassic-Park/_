import {Module} from '@nestjs/common';
import {ThresholdService} from "./app.service";
import {ThrottlerModule} from "@nestjs/throttler";
import {ThresholdController} from "./app.threshold.controller";
import {NotifierController} from "./app.notifier.controller";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 1000,
        }),
    ],
    controllers: [ThresholdController, NotifierController],
    providers: [ThresholdService],
})
export class ThresholdsModule {}