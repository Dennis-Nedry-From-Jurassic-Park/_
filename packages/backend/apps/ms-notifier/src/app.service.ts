import {Injectable, OnApplicationShutdown, OnModuleDestroy} from "@nestjs/common";
import {NatsJetStreamClient} from "@nestjs-plugins/nestjs-nats-jetstream-transport";
import {NatsJetStreamClientProxy} from "@nestjs-plugins/nestjs-nats-jetstream-transport/dist/client";
import {DebugEvents, NatsConnection} from "nats";
import {vm} from "./app.config";
import {createClient} from "redis";
import {COINGECKO, IMOEX, NONE, SPBE_HKD} from "./keydb_config";

@Injectable()
export class TinkoffInvestmentsNotificationService implements OnApplicationShutdown {
    public conn: Promise<NatsConnection> | undefined;
    private imoex: any[] = [];
    private keydb_client: any;

    constructor(
        private client: NatsJetStreamClient,

    ){
        this.keydb_client = createClient();
       // this.imoex = []
    }

    // async onModuleDestroy(signal: string) {
    //     await this.keydb_client.disconnect();
    //     console.log(signal); // e.g. "SIGINT"
    // }
    async onApplicationShutdown(signal: string) {
        await this.keydb_client.SET(IMOEX, JSON.stringify(this.imoex));
        await this.keydb_client.disconnect();
        console.log(signal); // e.g. "SIGINT"
    }

    async onModuleInit() {
        console.log(`The service module has been initialized.`);
        this.client = new NatsJetStreamClient(new NatsJetStreamClientProxy({
            connectionOptions: {
                servers: vm,
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
        this.conn = this.client?.connect();
        console.log(this.client);
        //console.log(await this.jsclient.connect().then());
        //console.log(await this.conn);
        await this.print()

        await this.keydb_client.connect();

        //await this.keydb_client.DEL(IMOEX);

        await this.keydb_client.SETNX(IMOEX, NONE);
        await this.keydb_client.SETNX(SPBE_HKD, NONE);
        await this.keydb_client.SETNX(COINGECKO, NONE);
        console.log("=");
        console.log(await this.keydb_client.GET(IMOEX));
        this.imoex = JSON.parse(await this.keydb_client.GET(IMOEX));
    }

    // async add_treshold (msg: any) {
    //     this.client.emit<any>('dto', msg)
    // }

    async update_tresholds (key: any = IMOEX) {
        await this.keydb_client.SET(key, JSON.stringify(this.imoex));
    }
    async get_tresholds (key: any = IMOEX): Promise<any> {
        return await this.keydb_client.GET(key);
    }

    async add_treshold (msg: any) {
        this.imoex.push(msg);

        //this.client.emit<any>('dto', msg)
    }

    async print() {
        await this.conn?.then(
            it => it
                .jetstream()
                .fetch('test', 'dto_pull', {
                    batch: 10000,
                    idle_heartbeat: 500,
                    max_bytes: 1000000,
                    expires: 10000,
                    no_wait: false
                })[Symbol.asyncIterator]().next().then(
                it => {
                    try{
                        console.log(111)
                        //console.log(it.value)
                        console.log(it.value.data)
                        console.log(it.value.data.toString())
                    } catch(err){
                        console.log(err);
                    }
                })
        );
    }
}