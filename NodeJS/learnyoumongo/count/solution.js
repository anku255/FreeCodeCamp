let mongo = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/learnyoumongo';
let givenAge = parseInt(process.argv[2]);

mongo.connect(url, (err, db) => {
  if (err) throw err;
  let parrots = db.collection('parrots');
  parrots.count({
    age: {$gt: givenAge}
  }, (err, count) => {
    if (err) throw err;
    console.log(count);
    db.close();
  });
});