let mongo = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/learnyoumongo';

let first_name = process.argv[2];
let last_name = process.argv[3];

let obj = {
  firstName: first_name,
  lastName: last_name
};

mongo.connect(url, (err, db) => {
  if (err) throw err;
  let docs = db.collection('docs');
  docs.insert(obj, (err, data) => {
    if (err) throw err;
    console.log(JSON.stringify(obj));
    db.close();
  });
});