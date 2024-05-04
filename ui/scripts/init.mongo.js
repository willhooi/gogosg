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
    name: 'Final Desti-Nasi',
    description: 'Kerana anda tiada pilihan', 
    review: 'Best nasi padang in Singapore',
    rating: 3.2,
    created: new Date(),
    type: 'Hawker',
    dataset:'food-beverages',
    user:'Admin 😎',
    email: 'abc@gmail.com'
   },
*/
];

db.places.insertMany(placesDB);
const count = db.places.count();
print('Inserted', count, 'places');

//initialize favourite list for names
const initialFavourite = [
/*
    {name: 'Final Desti-Nasi'},  
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