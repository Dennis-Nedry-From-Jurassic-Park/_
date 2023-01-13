// import {Global, Module} from '@nestjs/common';
// import { NatsController } from './nats.controller';
// import { NatsService } from './nats.service';
// import { NatsJetStreamTransport } from '@nestjs-plugins/nestjs-nats-jetstream-transport';
//
// @Global()
// @Module({
//     imports: [
//         NatsJetStreamTransport.register({
//             connectionOptions: {
//                 //servers: '188.120.227.233:4222',
//                 servers: 'localhost:3000',
//                 name: 'myservice-publisher',
//             },
//         }),
//     ],
//     controllers: [NatsController],
//     providers: [NatsService],
// })
// export class NatsModule {}