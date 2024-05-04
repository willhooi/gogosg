/*
 * Initialize DB using
 * 1. systemctl start mongod
 * 2. localhost: mongo gogosg scripts/init.mongo.js
 * 3. To use MongoDB Atlas: mongo mongodb+srv://gogosg:1g0g0SG@gogosg.l44uqf9.mongodb.net/gogosg scripts/init.mongo.js

*/
db.places.deleteMany({});

//INITIAL DATA
const placesDB = [
  /*
  {
   id: 1,
   name: 'KimChi Express',
   description: 'Established since 2021', 
   review: 'This is good!',
   rating: 4.2,
   created: new Date(),
   type: 'Restaurant',
   dataset:'attractions',
   user:'Admin 😎',
  },
  {
    id: 2,
    name: 'Final Desti-Nasi',
    description: 'Kerana anda tiada pilihan', 
    review: 'Best nasi padang in Singapore',
    rating: 3.2,
    created: new Date(),
    type: 'Hawker',
    dataset:'food-beverages',
    user:'Admin 😎'
   },
   {
    id: 3,
    name: 'Hotel Jiakalifornia',
    description: 'This is a place for spicy time', 
    review: 'Tried checking in but cannot seemed to checkout..',
    rating: 4.8,
    created: new Date(),
    type: 'Hotel',
    dataset:'accommodation',
    user:'Admin 😎'
   },
 */
];

db.places.insertMany(placesDB);
const count = db.places.count();
print('Inserted', count, 'places');

//initialize favourite list for names
const initialFavourite = [
  /*
    {name: 'Kimchi Express'}, 
    {name: 'Final Desti-Nasi'},  
    {name: 'Hotel Jiakalifornia'},
    */
];
db.favlist.deleteMany({});
db.favlist.insertMany(initialFavourite);

db.counters.deleteMany({ _id: 'places' });
db.counters.insert({ _id: 'places', current: count });

db.places.createIndex({ id: 1 }, { unique: true });
db.places.createIndex({ name: 1 });
db.places.createIndex({ review: 1 });
db.places.createIndex({ rating: 1 });