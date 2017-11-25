let mongo = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/' + process.argv[2];
let dbName = process.argv[3];
let givenId = process.argv[4];

mongo.connect(url, (err, db) => {
  let collection = db.collection(dbName);
  collection.remove({
    _id: givenId
  }, (err) => {
    if (err) throw err;
    db.close();
  });
});