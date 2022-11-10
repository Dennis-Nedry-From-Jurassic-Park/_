import {get_index, IndexInvesting} from "./common";
import bot from "./telegram/bot";
import secrets from "./utility-methods/env";

const exec_investing_robot = async () => {
    //const moex = await get_index(IndexInvesting.IMOEX);
    const sp500 = await get_index(IndexInvesting.SP500);
    const nasdaq = await get_index(IndexInvesting.NASDAQ);
    //const nvda = await get_index(IndexInvesting.NVDA);
    const btc_usd = await get_index(IndexInvesting.BTCUSD);
    //const brent = await get_index(IndexInvesting.BRENT);

    const caret = "\r\n";
    let val = 15795
    if(btc_usd.value < 15799 || btc_usd.value > 17250 || val < 15799){
        console.log(111);
        await bot.telegram.sendMessage(
            secrets.telegramInvestingBotId!,
            //`🇷🇺 ${moex.dateTime} : Индекс Мосбиржи = <b>${moex.value}</b>` + caret +
            `🇱🇷 ${sp500.dateTime} : Индекс SP500 = <b>${sp500.value}</b>` + caret +
            //`🇱🇷 ${nvda.dateTime} : nvda = <b>${nvda.value}</b>` + caret +
            //`🇱🇷 ${brent.dateTime} : brent = <b>${brent.value}</b>` + caret +
            `  ₿   ${btc_usd.dateTime} : BTC/USD = <b>${btc_usd.value}</b>` + caret +
            `🇱🇷 ${nasdaq.dateTime} : Индекс NASDAQ = <b>${nasdaq.value}</b>`,
            {parse_mode: `HTML`}
        );
    }

}

export const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {

    while (true) {
        exec_investing_robot()
            .then(r => console.log('exec_investing_robot finished ' + r))
            .catch(err => console.log(err));
        await delay(2 * 60000)

    }
}


const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();



const exec = async () => {
    let data = await CoinGeckoClient.ping();
    console.log(data);
    try {
        let data = await CoinGeckoClient.simple.price({
            ids: [
                'bitcoin',
                'tether',
                'ftx-token',
                'solana',
                'aptos',
                'ripple',
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
    }

}
exec();

//main();




