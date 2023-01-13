import {NestFactory} from '@nestjs/core';
import {FastifyAdapter, NestFastifyApplication,} from '@nestjs/platform-fastify';
import {NotifierModule} from "./app.module";
import {HttpExceptionFilter} from "@algoan/nestjs-http-exception-filter";
import {CustomStrategy} from "@nestjs/microservices";
import {NatsJetStreamServer} from "@nestjs-plugins/nestjs-nats-jetstream-transport";
import {DebugEvents} from "nats";

const ms_name = 'ms:notifier'
const ms_description = ''

async function bootstrap() {
    const nats_options: CustomStrategy = {
        strategy: new NatsJetStreamServer({
            connectionOptions: {
                servers: '188.120.227.233:4222',
                name: 'myservice-listener',
                connectedHook: async (nc) => {
                    console.log('Connected to ' + nc.getServer());
                    for await (const s of nc.status()) {
                        if (s.type == DebugEvents.PingTimer) {
                            console.log('We got ping timer attempt: ' + s.data);
                        }
                    }
                },
            },
            consumerOptions: {
                deliverGroup: 'myservice-group',
                durable: 'myservice-durable',
                deliverTo: 'myservice-messages',
                manualAck: false,
            },
            streamConfig: {
                name: 'test',
                subjects: [
                    //'order.*',
                    'dto'
                ],
            },
        }),
    };

    const app = await NestFactory.create<NestFastifyApplication>(NotifierModule, new FastifyAdapter());

    //await app.connectMicroservice(natsStreamConfig);

    await app.enableCors();
    await app.enableShutdownHooks();
    await app.useGlobalFilters(new HttpExceptionFilter());
    await app.startAllMicroservices();

    const nats_micro_service = app.connectMicroservice(nats_options);
    await nats_micro_service.listen();

    await app.listen(9205, '0.0.0.0');
}

bootstrap().then(()=>{
    console.log(` 🚀 ${ms_name} ${ms_description} is running on: http://localhost:9200`);
    process.stdout.write(` 🚀 ${ms_name} ${ms_description} is running on: http://localhost:9200`);
}).catch(err=>{
    console.error(err);
    // TODO: exit https://www.npmjs.com/package/nats
    //process.exit(1);
});