import {Injectable} from '@nestjs/common';
import {NatsClient} from "@alexy4744/nestjs-nats-jetstream-transporter";
import {DebugEvents, JetStreamClient, NatsConnection} from "nats";
import {QueuedIterator} from "nats/lib/nats-base-client/queued_iterator";
import {JsMsg} from "nats/lib/nats-base-client/types";
import {NatsJetStreamClient} from "@nestjs-plugins/nestjs-nats-jetstream-transport";
import {NatsJetStreamClientProxy} from "@nestjs-plugins/nestjs-nats-jetstream-transport/dist/client";

@Injectable()
export class TinkoffInvestmentsNotificationService {
    //public natsClient: NatsClient | undefined;
    //public client: JetStreamClient | undefined;
    public jsclient: NatsJetStreamClient | undefined;
    public conn: Promise<NatsConnection> | undefined;


    constructor(
        //public readonly client: NatsJetStreamClient
    ) {
        // client.connect().then(async (nc) => {
        //     for await (const s of nc.status()) {
        //         console.log(s);
        //     }
        // });
    }

    async onModuleInit() {
        console.log(`The service module has been initialized.`);

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
        // this.client = await this.natsClient!.getJetStreamClient();
        //console.log(this.client);
        this.jsclient = new NatsJetStreamClient(new NatsJetStreamClientProxy({
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
            }
        }))
        this.conn = this.jsclient?.connect();
        console.log(this.jsclient);
        //console.log(await this.jsclient.connect().then());
        //console.log(await this.conn);
        await this.print()

        // this.conn?.then(
        //     it => it.publish()
        //     it => it.jetstreamManager().then(
        //         it.publish
        //     )
        // )

    }

    async get_js_client(): Promise<any> {
        return this.jsclient
    }
    async get_js_conn(): Promise<any> {
        // this.conn?.then(
        //     it => it.publish()
        // )
        return this.conn
    }
    async print() {
        console.log(await this.conn?.then(
            it => it
                .jetstream()
                .fetch('test', 'dto_pull', {
                    batch: 10000,
                            idle_heartbeat: 0,
                            max_bytes: 1000000,
                            expires: 10000,
                            no_wait: true
                })[Symbol.asyncIterator]().next().then(
                it => {
                    try{
                        //console.log(111)
                        //console.log(it.value)
                        console.log(it.value.data)
                        console.log(it.value.data.toString())
                    } catch(err){
                        console.log(err);
                    }
                })
        ));
    }

    async fetch_msg() {
        console.log(await this.conn?.then(
            it => it
                .jetstream()
                .fetch('test', 'dto_pull', {
                    batch: 10000,
                    idle_heartbeat: 0,
                    max_bytes: 1000000,
                    expires: 10000,
                    no_wait: true
                })[Symbol.asyncIterator]().next().then(
                it => {
                    try{
                        //console.log(it.value)
                        //console.log(it.value.data)
                        const arr = [...it.value.data]
                        console.log(arr);
                        //console.log(it.value.data.toString())
                    } catch(err){
                        console.log(err);
                    }
                })
        ));
    }



    // public natsClient: NatsClient = new NatsClient(
    //     {
    //         connection: {
    //             debug: false,
    //             verbose: false,
    //             servers: ['nats://188.120.227.233:4222']
    //             //servers: ['nats://localhost:4222']
    //         }
    //     }
    // );
    // public jsClient: JetStreamClient | undefined;
    // public iter: AsyncIterator<JsMsg, any, undefined> | undefined;

    //constructor() {}


    // get_all() {
    //     this.client.connect().then(
    //         // it => it.jetstream({
    //         //
    //         // }).subscribe('dto', {}).then(
    //         //     it => it[Symbol.asyncIterator]().next().then(
    //         //         it => console.log(it.value)
    //         //     )
    //         // )
    //         // it => it.request('dto').then(
    //         //     it => {
    //         //         console.log('ans: ');
    //         //         console.log(it.data.toString())
    //         //         console.log(it.reply)
    //         //         console.log(it.headers)
    //         //     }
    //         // )
    //         it => it.subscribe('dto')[Symbol.asyncIterator]().next().then(value => {
    //             console.log('data = ' + value.value.data.toString());
    //             console.log('data = ' + value);
    //         })
    //     )
    // }
    //
    // get() {
    //     this.client
    //         .emit<any>('dto', {})
    //         .subscribe((pubAck) => {
    //             console.log(pubAck);
    //         });
    // }

    // constructor() {
    //     this.natsClient = new NatsClient(
    //         {
    //             connection: {
    //                 debug: false,
    //                 verbose: false,
    //                 servers: ['nats://188.120.227.233:4222']
    //                 //servers: ['nats://localhost:4222']
    //             }
    //         }
    //     );
    //     this.jsClient = this.natsClient.getJetStreamClient();
    //     this.iter = this.jsClient?.fetch('test','dto_pull',{
    //         batch: 10000,
    //         idle_heartbeat: 0,
    //         max_bytes: 1000000,
    //         expires: 10000,
    //         no_wait: true
    //     })[Symbol.asyncIterator]();
    // }

    // public get_iter() {
    //     return this.iter
    // }
    // public get_nats_client() {
    //     return this.natsClient
    // }


}

