import {Module} from '@nestjs/common';
import {TinkoffInvestmentsNotificationController} from "./app.controller";
import {TinkoffInvestmentsNotificationService} from "./app.service";
import {ThrottlerModule} from "@nestjs/throttler";
import {NatsJetStreamClient, NatsJetStreamTransport} from "@nestjs-plugins/nestjs-nats-jetstream-transport";
import {vm} from "./app.config";

@Module({
    imports: [
        NatsJetStreamTransport.register({
            connectionOptions: {
                servers: vm,
                name: 'myservice-publisher',
            },
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
    ],
    controllers: [TinkoffInvestmentsNotificationController],
    providers: [TinkoffInvestmentsNotificationService, NatsJetStreamClient],
})
export class NotifierModule {}