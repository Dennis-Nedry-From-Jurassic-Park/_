// import {instrumentsService} from "../../ms-base-tinkoff-investments/src/instruments.service";
// import {api} from "../../ms-base-tinkoff-investments/src/api";
// import {prettyJSON} from "../../ms-base-tinkoff-investments/src/output";
// import {LastPrice} from "tinkoff-invest-api/cjs/generated/marketdata";
// import {toNum} from "../../ms-base-tinkoff-investments/src/number";
//
// type ShareTreshold = {
//     ticker: string,
//     price: number | undefined,
//     price_i: number | undefined,
//     tresholds: number[] | undefined,
//
// }
// type ShareType = {
//     ticker: string,
//     currency: string,
//     figi: string,
//     price: number | undefined,
//     time: Date | undefined
// }
//
// const nearestNumber = require('nearest-number')
//
// const exec = async () => {
//     let tickers: string[] = ['POLY']; // 'LKOH', 'ROSN',
//     let figies: string[] = await instrumentsService.get_figies(tickers);
//
//     const resp = await api.marketdata.getLastPrices({figi: figies});
//
//     const shares: ShareType[] = resp.lastPrices.map((lastPrice: LastPrice) => {
//         const figi = lastPrice.figi
//         const share = instrumentsService.get_share_by_figi_sync(figi);
//
//         return {
//             ticker: share.ticker,
//             currency: share.currency,
//             figi: figi,
//             price: toNum(lastPrice.price),
//             time: lastPrice.time
//         }
//     });
//
//     const hm_prices = new Map<string, number | undefined>();
//     const hm_tresholds = new Map<string, number[] | undefined>();
//
//     let tresholds: ShareTreshold[] = [];
//
//     for (const share of shares) {
//         let tresholds_temp = get_default_tresholds(share.ticker);
//         tresholds_temp.push(share.price!);
//         tresholds_temp.sort();
//
//         const index = tresholds_temp.indexOf(share.price!)!
//         if (index !== -1) {
//             tresholds_temp.splice(index, 1);
//         }
//         tresholds.push({
//             ticker: share.ticker,
//             price: share.price,
//             price_i: index,
//             tresholds: tresholds_temp
//         });
//     }
//
//     while (true) {
//         const resp = await api.marketdata.getLastPrices({figi: figies});
//
//         const shares: ShareType[] = resp.lastPrices.map((lastPrice: LastPrice) => {
//             const figi = lastPrice.figi
//             const share = instrumentsService.get_share_by_figi_sync(figi);
//
//             return {
//                 ticker: share.ticker,
//                 currency: share.currency,
//                 figi: figi,
//                 price: toNum(lastPrice.price),
//                 time: lastPrice.time
//             }
//         });
//
//         for (const share of shares) {
//             const last_price = share.price!;
//             //const stock = resp.lastPrices.filter(it => it.figi === share.figi)[0]
//
//             const treshold = tresholds.filter(it => it.ticker === share.ticker)[0]
//             treshold.tresholds!.push(last_price);
//             treshold.tresholds!.sort();
//
//             const last_price_i = treshold.tresholds!.indexOf(last_price)!
//             if (last_price_i !== -1) {
//                 treshold.tresholds!.splice(last_price_i, 1);
//             }
//
//             if (last_price_i !== treshold.price_i) {
//                 let nearest_price = nearestNumber(treshold.tresholds!, treshold.price!);
//                 console.log(
//                     'ticker = ' + treshold.ticker + '; ' +
//                     'price = ' + last_price + '; ' +
//                     'price_fut = ' + nearest_price + '; ' +
//                     'i = ' + last_price_i
//                 );
//
//                 let nearest_price_i = treshold.tresholds!.indexOf(nearest_price)!
//
//                 if (nearest_price_i !== -1) {
//                     treshold.tresholds!.splice(nearest_price_i, 1);
//                 }
//
//                 // if (price_emulated_i !== -1) {
//                 //     treshold.tresholds!.splice(price_emulated_i, 1);
//                 // }
//             }
//
//             treshold.price = last_price;
//             treshold.price_i = last_price_i;
//         }
//
//         await delay(2000)
//     }
// }
// export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
//
// const get_default_tresholds = (ticker: string): number[] => {
//     let tresholds: number[] = [];
//     if (ticker === 'LKOH') {
//         tresholds = [3900, 4150, 4500, 4597.5, 4600, 4602, 4615, 4630, 4725]
//     } else if (ticker === 'ROSN') {
//         tresholds = [312, 325, 333, 334, 335, 336, 350, 365]
//     } else if (ticker === 'POLY') {
//         tresholds = [235, 250, 265, 325, 350, 370, 372, 374, 375, 376, 377, 380]
//     }
//     return tresholds
// }
//
// exec();
//
//
// //hm_prices.set(share.ticker, share.price || 0.0);
// //hm_tresholds.set(share.ticker, get_default_tresholds(share.ticker))
// // for(const ticker of hm_tresholds.keys()){
// //     hm_tresholds.get(ticker)!.push(hm_prices.get(ticker)!);
// //     hm_tresholds.get(ticker)!.sort();
// // }
//
// // const hm_indices = new Map<string, number | undefined>();
// // const lkoh_i = hm_tresholds.indexOf(hm_prices.get('LKOH')!)!
// // hm_indices.set('LKOH', lkoh_i)
// // if (lkoh_i !== -1) {
// //     arr.splice(lkoh_i, 1);
// // }
// // for(const ticker of ['LKOH']){
// //     const treshold = tresholds.filter(it => it.ticker === ticker)[0];
// //     for(const price_emulated of [4100, 4160, 3799, 4400, 4600, 4701]){
// //         treshold.tresholds!.push(price_emulated);
// //         treshold.tresholds!.sort();
// //         //console.log(treshold.price!);
// //         console.log(treshold.tresholds!);
// //         //console.log(price_emulated);
// //         const price_emulated_i = treshold.tresholds!.indexOf(price_emulated)!
// //         if (price_emulated_i !== -1) {
// //             treshold.tresholds!.splice(price_emulated_i, 1);
// //         }
// //
// //         if(price_emulated_i !== treshold.price_i) {
// //             let nearest_price = nearestNumber(treshold.tresholds!, price_emulated);
// //             console.log('цена достигла уровня ' + nearest_price + ' RUB' + '');
// //         }
// //     }
// // }