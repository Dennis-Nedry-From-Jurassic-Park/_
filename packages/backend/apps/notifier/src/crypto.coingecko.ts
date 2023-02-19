const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const exec999 = async () => {
    let data = await CoinGeckoClient.ping();
    console.log(data);
    try {
        let data = await CoinGeckoClient.simple.price({
            ids: [
                'bitcoin',
                'ethereum',
                'tether',
                'ftx-token',
                'solana',
                'aptos',
                'ripple',
                'FLOKI',
                'zcash',
                'axie-infinity',
                'hedera',
                'polkadot',
                'fantom',
                'cosmos-hub',
                'the-open-network',
            ],
            vs_currencies: ['usd', 'rub'],
        });
        
        console.log(data.data);

        Object.entries(data.data).forEach(
            ([key, value]: [string, any]) => {
                console.log(key, value['usd']);
            });

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