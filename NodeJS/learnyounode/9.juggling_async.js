// 9. JUGGLING ASYNC
// Same as last problem except this time we will
// get three urls and data should be printed in order

let http = require('http');

let urls = process.argv.slice(2);

let results = [];
let count = 0;

function httpGet(index) {

    let result = '';
    http.get(urls[index], (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            result += data;
        });
        res.on('end', () => {
            results[index] = result;
            count++;
            if (count === 3)
                printData();
        });
    });
  
}

for(let i=0; i<urls.length; i++)
    httpGet(i);

function printData() {
    results.forEach((data) => console.log(data));
}