let mongo = require('mongodb').MongoClient;

let givenAge = parseInt(process.argv[2]);
let url = 'mongodb://localhost:27017/learnyoumongo';

// connect to database
mongo.connect(url, (err, db) => {
  if (err) throw err;
  let parrots = db.collection('parrots');
  parrots.find({
    age: {$gt: givenAge}
  }).toArray((err, docs) => {
    if (err) throw err;
    console.log(docs);
    db.close();
  });
});