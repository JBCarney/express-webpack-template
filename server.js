import fs from 'fs';
import express from 'express';
import Schema from './data/schema';
import GraphQLHTTP from 'express-graphql';
import {graphql} from 'graphql';
import {introspectionQuery} from 'graphql/utilities';

import {MongoClient} from 'mongodb';

let app = express();
app.use(express.static('public'));

MongoClient.connect('mongodb://staffguest:StaffGuest@ds032340.mlab.com:32340/homemaintplannerdb', (err, database) => {
  if (err) throw err;

  database.collection("tasks").find({}).toArray((err, tasks) => {
    if (err) throw err;

    console.log(tasks);
  });
});

// (async () => {
//   try {
//     let db = await MongoClient.connect('mongodb://staffguest:StaffGuest@ds032340.mlab.com:32340/homemaintplannerdb');
//     let schema = Schema(db);

//     app.use('/graphql', GraphQLHTTP({
//       schema,
//       graphiql: true
//     }));

//     app.listen(3000, () => console.log('Listening on port 3000'));

//     // Generate schema.json
//     let json = await graphql(schema, introspectionQuery);
//     fs.writeFile('./data/schema.json', JSON.stringify(json, null, 2), err => {
//       if (err) throw err;

//       console.log("JSON schema created");
//     });
//   } catch(e) {
//     console.log(e); 
//   }
// })();
