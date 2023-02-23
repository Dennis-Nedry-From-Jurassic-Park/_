```ts
import {delay} from "./array";
import assert from "assert";

const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();

type Threshold = { "ticker": string, "thresholds": number[] }
type TickerPrice = { "ticker": string, "price": number }

const exec = async () => {
    // fetch from api
    let thresholds = [
        {
            "ticker": "ethereum",
            "thresholds": [1600, 1800]
        },
        {
            "ticker": "solana",
            "thresholds": [21, 25, 29, 32]
        }
    ]

    let hm = new Map<string, {
        price: number,
        arr: number[],
        oldIndex: number,
        newIndex: number,
    }>();

    for (; ;) {
        await delay(30000)

        try {
            let ping = await CoinGeckoClient.ping();
            assert(ping.code === 200)

            const coins = [
                'ethereum',
                'solana',
            ]
            let data = await CoinGeckoClient.simple.price({
                ids: coins,
                vs_currencies: ['usd', 'rub'],
                include_24hr_vol: true,
                include_24hr_change: true,
            }).data;

            let prices: TickerPrice[] = []

            Object.entries(data.data).forEach(
                ([key, value]: [string, any]) => {
                    prices.push({
                        "ticker": key,
                        "price": value['usd'],
                    })
                });

            const hm = await update_thresholds(thresholds, prices, false)


        } catch (err) {

        }

    }
}

const update_thresholds = async (
    thresholds: Threshold[],
    prices: TickerPrice[],
    update: boolean
) => {
    let hm = new Map<string, {
        price: number,
        arr: number[],
        oldIndex: number,
        newIndex: number,
    }>();
    for (const threshold of thresholds) {
        const price = prices.filter(it => it.ticker === threshold.ticker)[0].price
        let arr = threshold.thresholds
        arr.push(price)
        arr.sort()

        let oldIndex;
        let newIndex;

        if(update) {
            oldIndex = hm.get(threshold.ticker)!.oldIndex
        } else {
            oldIndex = arr.indexOf(price)
            newIndex = arr.indexOf(price)
        }

        hm.set(threshold.ticker, {
            price: price,
            arr: arr,
            oldIndex: oldIndex,
            newIndex: newIndex
        })
    }
    return hm
}

exec();
```