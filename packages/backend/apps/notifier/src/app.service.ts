import {Injectable, OnApplicationShutdown} from "@nestjs/common";
import {createClient} from "redis";
import {getVal, NONE, Source, ThresholdKey} from "./thresholds.keys";
import {stringify} from "./thresholds.stringify";
import {Threshold, TickerAlert} from "./thresholds.dto";
import {_} from "./lodash";

@Injectable()
export class ThresholdService implements OnApplicationShutdown {
    thresholds_shares_coingecko: TickerAlert[] = [];
    private thresholds_shares_imoex: any[] = [];
    private thresholds_shares_spbe_hkd: any[] = [];

    private readonly keydb_client: any;

    constructor() {
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


    async rm_threshold(
        ticker: string,
        dir: string,
        val: number,
    ) {
        const alerts = this.thresholds_shares_coingecko
            .filter(it => it.ticker === ticker)[0]
            .alerts
        const prepared = _.pullAllBy(alerts, [{ 'dir': dir, 'val': val }], 'dir', 'val')
        console.log(prepared);

        this.thresholds_shares_coingecko
            .filter(it => it.ticker === ticker)[0]
            .alerts = prepared;
        // TODO: await this.keydb_client.SET(getVal(ThresholdKey, source), );
    }

    get_keydb_client() {
        return this.keydb_client;
    }

    async onModuleInit() {
        await this.keydb_client.connect();

        await this.keydb_client.SETNX(ThresholdKey.COINGECKO, NONE);
        await this.keydb_client.SETNX(ThresholdKey.IMOEX, NONE);
        await this.keydb_client.SETNX(ThresholdKey.SPBE_HKD, NONE);
        // TODO: https://www.npmjs.com/package/type-thresholder
        this.thresholds_shares_coingecko
            = this.makeUnique(JSON.parse(await this.keydb_client.GET(ThresholdKey.COINGECKO)))
        this.thresholds_shares_imoex
            = JSON.parse(await this.keydb_client.GET(ThresholdKey.IMOEX));
        this.thresholds_shares_spbe_hkd
            = JSON.parse(await this.keydb_client.GET(ThresholdKey.SPBE_HKD));
    }

    async add_thresholds_(msg: Threshold) {
        let merged_array: any[] = []
        const key = msg.type
        const tickers = msg.data.map(it => it.ticker)
        const tickers_thresholds = this.thresholds_shares_coingecko.map(it => it.ticker)

        if (key === ThresholdKey.COINGECKO.split('.').pop()) {
            for (const ticker of tickers) {
                if (tickers_thresholds.includes(ticker)) {
                    msg.data.forEach(it => { // обход на уровне тикеров
                        for (const thd of it.alerts) {
                            this.thresholds_shares_coingecko
                                .filter(t => t.ticker === it.ticker)[0]
                                .alerts.push(thd)
                        }
                    })
                } else {
                    msg.data.forEach(it => {
                        this.thresholds_shares_coingecko.push(it)
                    })
                }
            }
            merged_array = this.thresholds_shares_coingecko
            await this.keydb_client.SET(getVal(ThresholdKey, key), stringify(merged_array));
        }
    }

    async get_thresholds_array(source: Source): Promise<any> {
        if (source === Source.coingecko) {
            return this.makeUnique(this.thresholds_shares_coingecko)
        } else if (source === Source.imoex) {
            return this.thresholds_shares_imoex
        } else if (source === Source.spbe_hkd) {
            return this.thresholds_shares_spbe_hkd
        }
    }

    async get_thresholds(source: string): Promise<string> {
        return await this.keydb_client.GET(getVal(ThresholdKey, source));
    }

    async clear_thresholds(source: string) {
        await this.keydb_client.DEL(getVal(ThresholdKey, source));
        this.thresholds_shares_coingecko = []
    }

    unique(arr, keyProps): any[] {
        const kvArray = arr.map(entry => {
            const key = keyProps.map(k => entry[k]).join('|');
            return [key, entry];
        });
        const map = new Map(kvArray);
        return Array.from(map.values());
    }

    makeUnique(array: TickerAlert[]): TickerAlert[] {
        let arr: TickerAlert[] = []

        for(let obj of array) {
            obj.alerts = this.unique(obj.alerts, ['dir', 'val'])
            arr.push(obj)
        }

        return _.uniqWith(arr, _.isEqual)
    }
}