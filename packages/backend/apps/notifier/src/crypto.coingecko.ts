const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();

type Coin = {
    id: string,
    symbol: string,
    name: string
}

const coins_list: Coin[] = require('./assets/coins.list.json');

console.log(coins_list.filter(it => it.id === 'the-open-network'));

const exec999 = async () => {
    let data = await CoinGeckoClient.ping();
    console.log(data);
    try {
        // TODO: https://www.coingecko.com/ru/api/documentation
        // TODO: https://github.com/nestjs/nest/tree/master/sample
        // https://www.npmjs.com/package/coingecko-api
        // https://www.npmjs.com/package/coingecko-api-v3
        // https://github.com/sinuoslabs/nestjs-notification
        // https://github.com/mvieracanive/nestjs-notifier
        const coins = [
            'bitcoin',
            'ethereum',
            'tether',
            'ftx-token',
            'solana',
            'aptos',
            'ripple',
            'floki',
            'zcash',
            'axie-infinity',
            'hedera-hashgraph',
            'polkadot',
            'fantom',
            'cosmos',
            'the-open-network',
        ]
        let data = await CoinGeckoClient.simple.price({
            ids: coins,
            vs_currencies: ['usd', 'rub'],
            include_24hr_vol: true,
            include_24hr_change: true,
        });
        
        console.log(data.data);

        Object.entries(data.data).forEach(
            ([key, value]: [string, any]) => {
                console.log(key, value['usd']);
            });

        console.log(coins.length);
        const keys = Object.keys(data.data)
        console.log(keys.length);
        const unique = coins.filter(function(obj) { return keys.indexOf(obj) == -1; });
        console.log(unique);


        // for (const [key, value]: [string, any] of Object.entries(data.data)) {
        //     console.log(key + ':' + value['usd']);
        // }

        // Object.keys(data.data).forEach((key: string) => {
        //     console.log(key + ' = ' + data[key]);
        // });

    } catch(err){
        console.log(err);
        //await delay(30000);

    }
}

exec999()