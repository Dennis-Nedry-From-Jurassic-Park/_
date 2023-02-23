import {ObservableArray} from 'rxjs-array';

export const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));


// https://www.npmjs.com/package/rxjs-array
// https://www.npmjs.com/package/observable-array
const exec = async () => {
    const array = new ObservableArray();

// Outputs changes of the array
    array.changes.subscribe(x => console.log(x));

    for(const x of [1, 2, 3, 4]){
        array.push(x)
        await delay (1000);
    }
    
    console.log('-------');
    console.log(array.at(-1));

    // https://stackoverflow.com/questions/5100376/how-to-watch-for-array-changes
    // Object.defineProperty(myArray, "push", {
    //     configurable: true,
    //     enumerable: false,
    //     writable: true, // Previous values based on Object.getOwnPropertyDescriptor(Array.prototype, "push")
    //     value: function (...args)
    //     {
    //         let result = Array.prototype.push.apply(this, args); // Original push() implementation based on https://github.com/vuejs/vue/blob/f2b476d4f4f685d84b4957e6c805740597945cde/src/core/observer/array.js and https://github.com/vuejs/vue/blob/daed1e73557d57df244ad8d46c9afff7208c9a2d/src/core/util/lang.js
    //
    //         RaiseMyEvent();
    //
    //         return result; // Original push() implementation
    //     }
    // });
}
exec();