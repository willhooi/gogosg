/*
 * Initialize DB using
 * 1. systemctl start mongod
 * 2. localhost: mongo gogosg scripts/init.mongo.js
 */

db.places.remove({});

//INITIAL DATA
const placesDB = [
  {
   id: 1,
   name: 'KimChi Express',
   description: 'Established since 2021', 
   review: 'This is good!',
   rating: 4.2,
   created: new Date(),
   type: 'Restaurant'
  },
  {
    id: 2,
    name: 'Final Desti-Nasi',
    description: 'Kerana anda tiada pilihan', 
    review: 'Best nasi padang in Singapore',
    rating: 3.2,
    created: new Date(),
    type: 'Hawker'
   },
 
];

db.places.insertMany(placesDB);
const count = db.places.count();
print('Inserted', count, 'places');

//initialize favourite list for names
const initialFavourite = [
    {name: 'Kimchi Express'}, 
    {name: 'Final Desti-Nasi'},  
];
db.favlist.remove({});
db.favlist.insertMany(initialFavourite);

db.counters.remove({ _id: 'places' });
db.counters.insert({ _id: 'places', current: count });

db.places.createIndex({ id: 1 }, { unique: true });
db.places.createIndex({ name: 1 });
db.places.createIndex({ review: 1 });
db.places.createIndex({ rating: 1 });