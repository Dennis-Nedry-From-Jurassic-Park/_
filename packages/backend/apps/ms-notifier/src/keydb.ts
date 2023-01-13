import { createClient } from 'redis';
import {COINGECKO, IMOEX, NONE, SPBE_HKD} from "./keydb_config";

const keydb_client = createClient();

keydb_client.on('error', (err) => console.log('KeyDB Client Error: ', err));

const exec = async () => {
    // await keydb_client.connect();
    //
    // await keydb_client.SETNX(IMOEX, NONE);
    // await keydb_client.SETNX(SPBE_HKD, NONE);
    // await keydb_client.SETNX(COINGECKO, NONE);
    //
    // const imoex = await keydb_client.GET(IMOEX);
    // console.log(imoex);
    // await keydb_client.disconnect();

    let imoex: any[] = [];
    const obj2 = {
        "ticker": "POLY",
        "tresholds": [375,367, 397]
    }
    const obj3 = {
        "ticker": "ALRS",
        "tresholds": [3715,3167, 3917]
    }

    //let combined = { ...imoex, ...obj2, ...obj3 };

   // var obj4 = Object.assign(imoex, obj2, obj3);

    imoex.push(obj2)
    imoex.push(obj3)

    console.log(imoex);
    
    
    let arr = JSON.parse(JSON.stringify("[]"))
    let arr2 = JSON.parse("[]")
    console.log(arr);
    console.log(arr2);
}
exec();


