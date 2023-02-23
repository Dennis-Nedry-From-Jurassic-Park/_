```js
module.exports = function nearby(threshold) {
    return function (arr, query) {
        for (var value of arr) {
            if (distance(value, query) <= threshold) {
                return true
            }
        }
        return false
    }
}

function distance(a, b) {
    return Math.abs(a - b)
}
```