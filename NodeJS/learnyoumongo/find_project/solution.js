let mongo = require('mongodb').MongoClient;

let givenAge = parseInt(process.argv[2]);
let url = 'mongodb://localhost:27017/learnyoumongo';

mongo.connect(url, (err, db) => {
  let parrots = db.collection('parrots');
  parrots.find({
    age: {$gt: givenAge}
  }, {
    name: 1,
    age: 1,
    _id: 0
  }).toArray((err, documents) =>{
    console.log(documents);
    db.close();
  });
});
