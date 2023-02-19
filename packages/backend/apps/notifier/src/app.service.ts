import {Injectable, OnApplicationShutdown} from "@nestjs/common";
import {createClient} from "redis";
import {getVal, NONE, ThresholdKey} from "./thresholds.keys";
import {stringify} from "./thresholds.stringify";
import {Threshold, TickerValue} from "./thresholds.dto";

@Injectable()
export class ThresholdService implements OnApplicationShutdown {
    private thresholds_shares_coingecko: TickerValue[] = [];
    private thresholds_shares_imoex: any[] = [];
    private thresholds_shares_spbe_hkd: any[] = [];
    private readonly keydb_client: any;

    constructor(

    ){
        this.keydb_client = createClient();
    }

    async onModuleDestroy(signal: string) {
        await this.keydb_client.disconnect();
        console.log(signal); // e.g. "SIGINT"
    }

    async onApplicationShutdown(signal: string) {
        await this.keydb_client.SET(ThresholdKey.COINGECKO, this.thresholds_shares_coingecko);
        await this.keydb_client.SET(ThresholdKey.IMOEX, JSON.stringify(this.thresholds_shares_imoex));
        await this.keydb_client.SET(ThresholdKey.SPBE_HKD, JSON.stringify(this.thresholds_shares_spbe_hkd));
        await this.keydb_client.disconnect();
        console.log(signal); // e.g. "SIGINT"
    }

    get_keydb_client() {
        return this.keydb_client;
    }

    async onModuleInit() {
        console.log(`The service module has been initialized.`);

        await this.keydb_client.connect();

        await this.keydb_client.SETNX(ThresholdKey.COINGECKO, NONE);
        await this.keydb_client.SETNX(ThresholdKey.IMOEX, NONE);
        await this.keydb_client.SETNX(ThresholdKey.SPBE_HKD, NONE);

        this.thresholds_shares_coingecko = JSON.parse(await this.keydb_client.GET(ThresholdKey.COINGECKO));
        this.thresholds_shares_imoex = JSON.parse(await this.keydb_client.GET(ThresholdKey.IMOEX));
        this.thresholds_shares_spbe_hkd = JSON.parse(await this.keydb_client.GET(ThresholdKey.SPBE_HKD));
    }

    async add_thresholds (msg: Threshold) {
        let merged_array: any[] = []
        const key = msg.type
        if(key === ThresholdKey.COINGECKO.split('.').pop()) {
            msg.data.forEach(it => {
                this.thresholds_shares_coingecko.push(it)
            })
            merged_array = this.thresholds_shares_coingecko;
        } else if (key === ThresholdKey.IMOEX.split('.').pop()) {

        } else if (key === ThresholdKey.SPBE_HKD.split('.').pop()) {

        } else {
            throw new Error('ThresholdKey not found.')
        }

        await this.keydb_client.SET(getVal(ThresholdKey, key), stringify(merged_array));
    }

    async get_thresholds (source: string): Promise<string> {
        return await this.keydb_client.GET(getVal(ThresholdKey, source));
    }
}