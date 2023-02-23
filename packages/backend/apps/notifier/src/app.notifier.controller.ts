import {Controller, Header, Post, Req} from "@nestjs/common";
import {ThresholdService} from "./app.service";
import {TickerPrice, TickerAlert} from "./thresholds.dto";
import {NotifierMap, Source, ThresholdDir} from "./thresholds.keys";

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

@Controller('notifier')
export class NotifierController {
    constructor(private readonly appService: ThresholdService) {}

    @Post([
        "crypto/coingecko"
    ]) // TODO: по крону запуск раз в 60 секунд
    @Header('content-type', 'application/json')
    async notifier_crypto(
        @Req() req: Request
    ) {
        let _thresholds: TickerAlert[] = await this.appService.get_thresholds_array(Source.coingecko)

        let coins: string[] = _thresholds.map(it => it.ticker);

        let data = await CoinGeckoClient.simple.price({
            ids: coins,
            vs_currencies: ['usd', 'rub'],
            include_24hr_vol: true,
            include_24hr_change: true,
        });

        let prices: TickerPrice[] = []

        Object.entries(data.data).forEach(
            ([key, value]: [string, any]) => {
                prices.push({ ticker: key, price: value['usd'] })
            });

        for(const ticker of prices.map(it => it.ticker)) {
            const alerts = _thresholds.filter(it => it.ticker === ticker)[0].alerts
            const price = prices.filter(it => it.ticker === ticker)[0].price
            for(const alert of alerts) {
                let msg = ''
                if(alert.dir === ThresholdDir.above && price >= alert.val) {
                    msg = `Price of ${ticker} has just exceeded your alert price of ${alert.val}`
                    console.log(msg);
                    await this.appService.rm_threshold(ticker, alert.dir, alert.val)
                } else if(alert.dir === ThresholdDir.below && price <= alert.val) {
                    msg = `Price of ${ticker} fell below your alert price of ${alert.val}`
                    console.log(msg);
                    await this.appService.rm_threshold(ticker, alert.dir, alert.val)
                }
            }
            console.log(`ticker: ${ticker} = ${price}`);
        }

        //
        //
        //
        // if (this.appService.b_notifier_crypto_coingecko) {
        //     this.appService.notifier_crypto_coingecko = await this
        //         .appService
        //         .update_thresholds(_thresholds, prices, this.appService.b_notifier_crypto_coingecko)
        // } else {
        //     this.appService.notifier_crypto_coingecko = await this
        //         .appService
        //         .update_thresholds(_thresholds, prices, this.appService.b_notifier_crypto_coingecko)
        //     this.appService.b_notifier_crypto_coingecko = true;
        // }
        //
        // console.log(this.appService.notifier_crypto_coingecko);
        //
        // for(let [ticker, value] of this.appService.notifier_crypto_coingecko) {
        //     const oldIndex = value.oldIndex
        //     const newIndex = value.newIndex
        //     console.log(`текущая цена ${ticker} ` + value.price);
        //
        //     if(oldIndex != newIndex) {
        //         const price = value.price
        //
        //         console.log(`цена ${ticker} достигла уровня ` + price);
        //
        //         this.appService.notifier_crypto_coingecko.get(ticker)!.oldIndex = -1
        //         this.appService.notifier_crypto_coingecko.get(ticker)!.newIndex = -1
        //
        //         // TODO: send to telegram notification
        //     }
        // }
    }
}