import { NatsTransportStrategy} from '@alexy4744/nestjs-nats-jetstream-transporter';
import { Options } from '@nestjs/common';

export const natsStreamConfig = {
    strategy: new NatsTransportStrategy({
        onError: (message) => { console.log("it = " + message);},
        connection: {
            servers: 'nats://188.120.227.233:4222',
            timeout: 1000,
        },
        streams: [
            {
                name: 'test',
                subjects: [ 'dto' ]
            }
        ]
    })
};