/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo caifantracker scripts/init.mongo.js
 */

db.places.remove({});

//INITIAL DATA -to be modified

const placesDB = [
  {
   id: 1,
   name: 'KimChi Express',
   description: 'Established since 2021', 
   review: 'This is good!',
   rating: 4.2,
   created: new Date()
  },
 
];

db.places.insertMany(placesDB);
const count = db.places.count();
print('Inserted', count, 'places');

const initialFavourite = [
    {name: 'Kimchi Express'}, 
    {name: 'Final Desti-Nasi'}, 
    {name: 'ZheGe NaGe'}
];
db.favlist.remove({});
db.favlist.insertMany(initialFavourite);

db.counters.remove({ _id: 'places' });
db.counters.insert({ _id: 'places', current: count });

db.places.createIndex({ id: 1 }, { unique: true });
db.places.createIndex({ name: 1 });
db.places.createIndex({ review: 1 });
db.places.createIndex({ rating: 1 });