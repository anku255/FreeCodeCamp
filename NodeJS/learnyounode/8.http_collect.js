// 8. HTTP COLLECT
// similar to last problem except that we have to collect
// all the data from the stream and
// print the output to console when 'end' event happens

let http = require('http');

let url = process.argv[2];

http.get(url, (res) => {
    result = '';
    res.setEncoding('utf8');
    res.on('data', (data) => {
        result += data;
    });

    res.on('end', () => {
        console.log(result.length);
        console.log(result);
    });
});