import {Body, Controller, Get, Header, Post, Req, UseGuards} from "@nestjs/common";

type Treshold = {
    ticker: string,
    tresholds: number[]
}
interface OrderCreatedEvent {
    id: number;
    product: string;
    quantity: number;
}
interface OrderUpdatedEvent {
    id: number;
    quantity: number;
}
interface OrderDeleteEvent {
    id: number;
}

import {NatsClient, NatsContext} from "@alexy4744/nestjs-nats-jetstream-transporter";
import {Ctx, EventPattern, MessagePattern, Payload} from "@nestjs/microservices";
import {NatsJetStreamClientProxy, NatsJetStreamContext, ServerConsumerOptions} from "@nestjs-plugins/nestjs-nats-jetstream-transport";
import {Throttle, ThrottlerGuard} from "@nestjs/throttler";
import {connect, JetStreamClient, StringCodec} from "nats";



//import { Controller } from '@nestjs/common';

// // to create a connection to a nats-server:
// const nc = await connect({ servers: "demo.nats.io:4222" });
//
// // create a codec
// const sc = StringCodec();
// // create a simple subscriber and iterate over messages
// // matching the subscription
// const sub = nc.subscribe("hello");
// (async () => {
//     for await (const m of sub) {
//         console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
//     }
//     console.log("subscription closed");
// })();
//
// nc.publish("hello", sc.encode("world"));
// nc.publish("hello", sc.encode("again"));

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
import { PubAck } from 'nats';
import {Observable} from "rxjs";
import {NatsError} from "nats/lib/nats-base-client/error";
import {ConsumerOptsBuilder, PublishOptions, Subscription} from "nats/lib/nats-base-client/types";
import {TinkoffInvestmentsNotificationService} from "./app.service";
import {ts} from "../../../../../../atr-bencher/packages/backend/apps/nodejs-libs/src/datetime/time";

const ORDER_CREATED = 'order.created';
const ORDER_UPDATED = 'order.updated';
const ORDER_DELETED = 'order.deleted';
@Controller('tinkoff-investments')
export class TinkoffInvestmentsNotificationController {
    private sc = StringCodec();
    public natsClient: NatsClient | undefined = new NatsClient(
        {
            connection: {
                debug: false,
                verbose: false,
                servers: ['nats://188.120.227.233:4222']
                //servers: ['nats://localhost:4222']
            }
        }
    );
    public client: JetStreamClient | undefined

    constructor(private readonly appService: TinkoffInvestmentsNotificationService) {}

    // constructor(
    //     //private readonly service: TinkoffInvestmentsNotificationService,
    //     //private readonly service2: NatsJetStreamClientProxy
    // ) { //
    //
    //
    // }

    @EventPattern('dto_')
    public async orderUpdatedHandler_(
        @Payload() data: string,
        @Ctx() context: NatsJetStreamContext,
    ) {

        console.log('received: ' + context.message.subject, data);
        context.message.ack();
    }



    //constructor(private readonly natsService: NatsService) {}
    //constructor() {
        // (async () => {
        //     const nc = await connect({servers: "188.120.227.233:4222"}).then();
        //
        // });
        // this.natsClient.getConnection()?.subscribe('dto', {
        //
        // }).callback(err,msg => {
        //
        // })
    //}

// request - response
//     @MessagePattern({ cmd: 'sum' })
//     async accumulate(data: number[]): Promise<number> {
//         console.log('message controller', data);
//         return (data || []).reduce((a, b) => a + b);
//     }
//
//     // request - response
//     accumulate(payload: number[]): Observable<number> {
//         const pattern = { cmd: 'sum' };
//         return this.client.send<number>(pattern, payload);
//     }

    // @EventPattern('dto')
    // public async stationCreatedHandler(@Payload() data: { id: number, name: string }, @Ctx() context: NatsJetStreamContext) {
    //     console.log(`received message: ${JSON.stringify(data)}`)
    //     context.message.ack()
    // }




    async onModuleInit() {
        //console.log(`The module has been initialized.`);

        // this.natsClient = new NatsClient(
        //     {
        //         connection: {
        //             debug: false,
        //             verbose: false,
        //             servers: ['nats://188.120.227.233:4222']
        //             //servers: ['nats://localhost:4222']
        //         }
        //     }
        // );
        //this.client = await this.natsClient!.getJetStreamClient();
       // console.log(this.client);

    }

    @Post('emit')
    async emit(){
        const client = await this.appService.get_js_client();
// nats stream view test --subject=dto
        const data = { 'ts': ts(), 'ticker': 'POLY', price: 323 };

        client.emit('dto', data)
        //var uint8array = new TextEncoder().encode(data);


        // nats consumer sub test dto_pull
        //await this.appService.get_js_conn().then(
            //publish(subject: string, data?: Uint8Array, options?: PublishOptions): void;

        //    it => it.publish('dto', uint8array, {})
        //)
        //this.natsClient?.emit("dto", { 'ts': ts(), 'ticker': 'POLY', price: 323});
        //const conn = await this.appService.get_js_conn();
        //conn.client
    }


    @Post('fetch')
    async fn2(){

        // this.client?.fetch('test','dto_pull',{
        //     batch: 10000,
        //     idle_heartbeat: 0,
        //     max_bytes: 1000000,
        //     expires: 10000,
        //     no_wait: true
        // })[Symbol.asyncIterator]().next().then(value => {
        //     console.log('value=');
        //     console.log(value.value.data.toString());
        //     //console.log(value.value);
        //    // console.log(JSON.stringify(value.value));
        // });

        //console.log('get');
        //this.appService.get()
        //console.log('get_all');
        //this.appService.get_all()
        //const res = this.service2.send<any>('dto', 1);

       // this.service.get();
        //res.subscribe()

        //this.jsClient = this.natsClient.getJetStreamClient();

        //this.natsClient.emit<PubAck, any>('dto', {})
        //this.natsClient.getJetStreamClient()?.pull('test', 'dto')
        //const res = this.natsClient.getJetStreamClient()?.fetch('test', 'myservice-durable-dto')
        //const obj: ConsumerOptsBuilder = new ConsumerOptsBuilder()

        // this.client.connect().then(it => {
        //     it.subscribe('dto', {})[Symbol.asyncIterator]().next().then(value => {
        //         console.log('value=');
        //         console.log(value);
        //     })
        // })


            // const res = await client?.pullSubscribe('dto_pull',  {
            //
            // })
        //const res2 = await client?.subscribe('dto',{})
        console.log("+=+");
        await this.appService.fetch_msg();
        //console.log(this.jsClient);






        // this.service.get_iter()!.next().then(value => {
        //     console.log(value.value.data.toString());
        // })
        //




        // this.jsClient?.fetch('test','dto_pull',{
        //     batch: 10000,
        //     idle_heartbeat: 0,
        //     max_bytes: 1000000,
        //     expires: 10000,
        //     no_wait: true
        // })[Symbol.asyncIterator]().next().then(value => {
        //     console.log('value=');
        //     console.log(value.value.data.toString());
        //     //console.log(value.value);
        //    // console.log(JSON.stringify(value.value));
        // });
        // })[Symbol.asyncIterator]().next().then(value => {
        //     console.log('value=');
        //     console.log(value.value.data.toString());
        //     //console.log(value.value);
        //    // console.log(JSON.stringify(value.value));
        // });
    //})



        // console.log("===");
        // console.log(res3);
        // console.log("===");
        // const res4 = await client?.pull(
        //     'test', 'dto_pull', 120
        // )
        // console.log(res);
        // console.log(res2);
        //console.log(res3);
        //console.log(res3);
        //console.log(res3!.toString());
        //console.log(JSON.stringify(res3));

        //(await res!).consumerInfo().then()
        //console.log(res!.consumerInfo());
        //res4.info.
        //console.log(JSON.stringify((res4)));

    }

    // @MessagePattern('dto')
    // async fn (
    //     @Payload() data: any,
    //     @Ctx() context: NatsContext,
    // ) {
    //     console.log(context.getMessage());
    // }
    @MessagePattern('dto_')
    async fn_ (
        @Payload() data: any,
        @Ctx() context: NatsJetStreamContext,
    ) {
 //       console.log(data);
        // let sub: Subscription | undefined
        //     = this.natsClient.getConnection()?.subscribe('dto')
        // console.log(sub?.getSubject());
        // console.log(sub?.getReceived());
        // console.log(sub?.getProcessed());
        // console.log(sub?.getID());
        // console.log(sub?.getMax());





        // console.log(sub?.callback(err, msg => {
        //
        // }));
        //sub?.callback()
        //console.log('it='+111);
        //context.message.ack();
       //ontext.message.next('dto')
 //       console.log(data);
        //console.log(context);
        //console.log(context.message);
        //console.log(`Subject: ${context.getSubject()}`);

        // let err: any;
        // let msg: any;
        // await this.client.connect().then(
        //     it => {
        //         it.subscribe('dto').callback(err, msg);
        //     }
        // )
        // this.client.emit<PubAck, any>('dto', {}).subscribe((pubAck) => {
        //
        //     console.log(pubAck);
        // });

        //const num = this.accumulate([1])
    }

    @Post('check-post-req')
    @Header('content-type', 'application/json')
    @UseGuards(ThrottlerGuard)
    @Throttle(5, 60)
    async check_post_req() {
        let data = await CoinGeckoClient.ping();
        console.log(data);
    }
// TODO https://www.npmjs.com/package/@nestjs-ex/stan-strategy/v/8.0.0

    @Post('add-treshold')
    @Header('content-type', 'application/json')
    async add_treshold(
        @Req() req: Request,
        @Body() body: Treshold
    )
{
        // json({
        //     verify: (req: any, res, buffer) => {
        //         if (Buffer.isBuffer(buffer)) {
        //             const rawBody = Buffer.from(buffer)
        //             req['parsedRawBody'] = rawBody
        //         }
        //         return true
        //     },
        // })(req,)
        //const req_data = await req.text()
        console.log(body);
        //console.log(req_data);
        //let json_ = JSON.stringify(body);

        // this.client.emit<OrderCreatedEvent>(ORDER_CREATED, {
        //     id: 1,
        //     product: 'Socks',
        //     quantity: 1,
        // })
        //     .subscribe((pubAck) => {
        //         console.log(pubAck);
        //     });

        //this.publishMessage();
        // https://github.com/mayflower/capnproto-typescript-k8s/blob/main/app_services/nestjs-receiver-publisher/src/datas/datas.controller.ts
        //this.natsClient.emit("dto", body); // *.*.*

       // console.log(json_);
    }

    // @Post("publishMessage")
    // public create(): void {
    //     this.publishMessage();
    // }

    @Get("sub")
    @EventPattern('dto_')
    public sub(
        @Payload() data: string,
        @Ctx() context: NatsJetStreamContext
    ): void {
        //this.natsClient.getConnection()?.jetstream().subscribe('dto')
       // this.natsClient.getConnection()?.subscribe("dto");
        //this.natsClient.getJetStreamClient().
        context.message.ack();
        console.log('received: ' + context.message.subject, data);
        //const sub = this.natsClient.getConnection()?.subscribe('dto')
        //sub?.getSubject().
        //sub?.getReceived()
    }


    // public publishMessage(): void {
    //     this.natsClient.emit("contact-person", "{}");
    // }

    @EventPattern('dto_')
    public async orderUpdatedHandler(
        @Payload() data: string,
        @Ctx() context: NatsJetStreamContext,
    ) {
        context.message.ack();
        console.log('received: ' + context.message.subject, data);
    }

    // @EventPattern("contact-person")
    // handleCreatedOrder() {
    //     // If a shipment cannot be scheduled at this time, then ask for the message to be redelivered
    //  console.log(111111);
    //
    //     // Otherwise, the message will be auto-acked
    // }

    // @EventPattern('contact-person')
    // public subscribeMessage(@Payload() data: Array<any>, @Ctx() context: NatsContext): void {
    //     console.log(111);
    //     console.log(`received message: ${JSON.stringify(data)}`)
    //     console.log(`Subscribed message subject: ${context.getSubject()}`);
    //     console.log(`Subscribed message subject: ${context.getMessage()}`);
    //     console.log(`Subscribed message subject: ${context.getHeaders()}`);
    // }
}