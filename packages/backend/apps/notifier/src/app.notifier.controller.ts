import {Controller, Header, Post, Req} from "@nestjs/common";
import {ThresholdService} from "./app.service";
import {TickerAlert, TickerPrice} from "./thresholds.dto";
import {Source, ThresholdDir} from "./thresholds.keys";
import bot, {TELEGRAM_BOT_ID} from "./telegram";

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

@Controller('notifier')
export class NotifierController {
    constructor(private readonly appService: ThresholdService) {}

    @Post([
        "crypto/coingecko"
    ]) // TODO: cron + tg message
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
                    msg = `⚠ ${ticker} >= ${alert.val}`
                    //msg = `Price of ${ticker} has just exceeded your alert price of ${alert.val}`
                    console.log(msg);
                    await bot.telegram.sendMessage(TELEGRAM_BOT_ID, msg)
                    await this.appService.rm_threshold(ticker, alert.dir, alert.val)
                } else if(alert.dir === ThresholdDir.below && price <= alert.val) {
                    msg = `⚠ ${ticker} <= ${alert.val}`
                    //msg = `Price of ${ticker} fell below your alert price of ${alert.val}`
                    console.log(msg);
                    await bot.telegram.sendMessage(TELEGRAM_BOT_ID, msg)
                    await this.appService.rm_threshold(ticker, alert.dir, alert.val)
                }
            }
            //await bot.telegram.sendMessage(TELEGRAM_BOT_ID, `⚠️ ticker: ${ticker} = ${price}`)
        }
    }
}