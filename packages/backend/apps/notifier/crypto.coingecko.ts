const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();


const exec = async () => {
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
                // zcash
                'the-open-network',
            ],
            vs_currencies: ['usd', 'rub'],
        });
        console.log(data);
    } catch(err){
        console.log(err);
        //await delay(30000);


    }

}
exec();