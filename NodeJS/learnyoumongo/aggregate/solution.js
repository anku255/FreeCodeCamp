let mongo = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/learnyoumongo';
let givenSize = process.argv[2];
mongo.connect(url, (err, db) => {
  if (err) throw err;

  let prices = db.collection('prices');
  prices.aggregate([
    { $match: {size: givenSize}},
    { $group: {
      _id: 'average',
      average: { $avg: '$price'}
    }}
  ]).toArray((err, results) => {
    if (err) throw err;
    console.log(Number(results[0]['average']).toFixed(2));
    db.close();
  });
});