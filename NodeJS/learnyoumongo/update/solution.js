let mongo = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/' + process.argv[2];

mongo.connect(url, (err, db) => {
  if (err) throw err;
  let collection = db.collection('users');
  collection.update({
    username: 'tinatime'
  }, {
    $set: {age: 40}
  }, (err) => {
    if (err) throw err;
    db.close();
  });
});
