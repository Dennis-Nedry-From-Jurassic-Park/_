import { connect, StringCodec } from "nats";
import Timestamp from "timestamp-nano";



const exec = async () => {
    // to create a connection to a nats-server:
    const nc = await connect({ servers: "0.0.0.0:4222" });
// create a codec
    const sc = StringCodec();

// create a simple subscriber and iterate over messages
// matching the subscription
    const sub = nc.subscribe("notifier.*.tresholds");

    for await (const m of sub) {
        console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    }
    console.log("subscription closed");

    nc.publish("notifier.ti.tresholds", sc.encode("world"));
    nc.publish("notifier.crypto.tresholds", sc.encode("again"));

    await nc.drain();
}
//console.log(Date.now());
//console.log(String(Date.now()));


//console.log(moment().format('YYYY-MM-DD HH:mm:ss.SSSSSSSSS') );

var dt = new Date();
const mom = moment('2022-12-13T11:26:01.043050001+03:00', 'YYYY-MM-DDTHH:mm:ss.SSSSSSSSSZ')
const mdt = mom.format('YYYY-MM-DDTHH:mm:ss.SSSSSSSSSZ')
const ts = Timestamp.fromString(mdt)

//console.log(mom);
//console.log(mdt);
//console.log(mom.format('X'));
//console.log(mom.format('x'));
const ts2 = Timestamp.fromTimeT(+mom.format('x'))


import number from "extra-number";

// export const convert_to_timestamp = (moment: Moment, format: string = 'X'): number => {
//     return +moment!.format(format)
// }
// export const convert_to_datetime = (timestamp: number): moment.MomentInput => {
//     return moment(timestamp * 1e3).utc()
// }

const moment_tz = require('moment-timezone');





console.log('date-fns');
import { getTime } from 'date-fns'
console.log(getTime(new Date()));


const dayjs = require('dayjs')
let utc = require('dayjs/plugin/utc')

dayjs.extend(utc);

console.log('dayjs');

console.log(dayjs.utc().unix());

//console.log(dayjs.utc().millisecond());
//console.log(dayjs.utc().unix().seconds());
//console.log(dayjs.utc().format('x'));
//console.log(dayjs.utc().seconds());



//console.log(dayjs.utc().valueOf());
//console.log(moment().utc().format('x'));

//console.log(dayjs.utc().format());
console.log('mtz');
const mtz =  moment_tz().tz('Europe/London').valueOf()
console.log(mtz.valueOf());




const m = moment().utc()
console.log(moment()); // timestamp in milliseconds
console.log(moment_tz().tz('Europe/London'));
console.log(moment_tz().tz('Europe/London'));
console.log(m); // timestamp in milliseconds
console.log(m.format('YYYY-MM-DDTHH:mm:ss')); // timestamp in milliseconds
console.log(m.format('x')); // timestamp in milliseconds
console.log(moment(+m.format('x'))); // timestamp in milliseconds
console.log(mom); // timestamp in milliseconds
console.log(convert_to_datetime(+mom.format('x'))); // timestamp in milliseconds
console.log(+mom.format('x')); // timestamp in milliseconds
console.log(moment(+mom.format('x')).toDate()); // 2022-12-13T08:26:01.043Z
console.log(moment(+mom.format('x')).toJSON()); // 2022-12-13T08:26:01.043Z
console.log(moment(+mom.format('x')).format('YYYY-MM-DDTHH:mm:ss.SSSZ')); // 2022-12-13T11:26:01.043+03:00


//console.log(ts.toDate());

// console.log(ts.addNano(0).toString());
// console.log(ts.addNano(123456789).toJSON());
// console.log(111);
// console.log(
//     Timestamp
//         .fromString(
//             moment('2022-12-13T11:26:01.043050001+03:00', 'YYYY-MM-DDTHH:mm:ss.SSSSSSSSSZ')
//                 .format('YYYY-MM-DDTHH:mm:ss.SSSSSSSSSZ')
//         ).getNano()
//         //.addNano(0).toJSON()
// );



//console.log(ts2.toDate());
//console.log(ts.getTimeT());
//console.log(new Date(ts.getTimeT() * 1000 + ts.getNano()).valueOf());
//console.log(ts.getTimeT()); // String(Date.now())
//console.log(ts.); // String(Date.now())
//console.log(ts); // String(Date.now())
//console.log(Timestamp.fromString(mdt).getTimeT()); // String(Date.now()) 2022-12-13T06:52:19.229Z
//console.log(Timestamp.); // String(Date.now()) 2022-12-13T06:52:19.229Z
//console.log(Timestamp.fromTimeT(1670914339)); // String(Date.now()) 2022-12-13T06:52:19.229Z
//console.log(Timestamp.fromTimeT(1670914339).addNano(229).toDate()); // String(Date.now()) 2022-12-13T06:52:19.229Z
//console.log(ts.toDate()); // String(Date.now())
//console.log(Timestamp.fromTimeT(1670913449727).toDate()); // String(Date.now()
//console.log(Timestamp.fromTimeT(52728915056837670000).toDate());
//exec();



// (async () => {
//     for await (const m of sub) {
//         console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
//     }
//     console.log("subscription closed");
// })();
//
// nc.publish("notifier.ti.tresholds", sc.encode("world"));
// nc.publish("notifier.crypto.tresholds", sc.encode("again"));
//
// // we want to insure that messages that are in flight
// // get processed, so we are going to drain the
// // connection. Drain is the same as close, but makes
// // sure that all messages in flight get seen
// // by the iterator. After calling drain on the connection
// // the connection closes.
// await nc.drain();