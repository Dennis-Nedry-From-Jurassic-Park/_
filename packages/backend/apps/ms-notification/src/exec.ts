import path from "path";

const flatCache = require('flat-cache')
// loads the cache, if one does not exists for the given
// Id a new one will be prepared to be created
let cache = flatCache.load('cacheId', path.resolve('./data/tresholds'));


const exec = async () => {
    cache.setKey('4', [
            { ticker: 'POLY', tresholds: [ 312, 322, 396 ] },
            { ticker: 'LKOH', tresholds: [ 4150, 4322, 3960 ] }
        ]
    );
    // cache.setKey('2', [
    //         { ticker: 'ROSN', tresholds: [ 312, 322, 415 ] },
    //         { ticker: 'POLY', tresholds: [ 312, 322, 415 ] },
    //         { ticker: 'LKOH', tresholds: [ 4150, 4322, 6000 ] }
    //     ]
    // );
    //
    cache.save()

    console.log(cache.all());

}
exec();