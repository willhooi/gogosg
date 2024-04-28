const fs = require('fs');
const express = require('express');
const { ApolloServer} = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/gogosg'; //initialize db

let db;

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    listFavourites,
  },
  Mutation: {
    addFavouritePlace,
    deleteFavouritePlace,
  },
  GraphQLDate,
};

async function deleteFavouritePlace(_,{placeName}){
  //check if id(or name) in places(or favlist)
  //if exist, delete from db.collection.places
  const existed = await db.collection('places').findOne({name:placeName});
  if (existed) {
    await db.collection('places').deleteOne({name:placeName});
    await db.collection('favlist').deleteOne({name:placeName});//update db so that can add again
    console.log('Deleted:');
    return true 
  }
  console.log('Not found');
  return false;

 
}

async function addFavouritePlace(_, {placeDetails}) {
  //check if already in fav list
  const favlisted = await db.collection('favlist').findOne({name:placeDetails.name});
  if (!favlisted){
    placeDetails.id = await getNextSequence('places');
    await db.collection('favlist').insertOne({ name: placeDetails.name});
    const result = await db.collection('places').insertOne(placeDetails);
    console.log('Added:',result.ops[0]);
    return true
  }
  console.log('Already added to favourites');
  return false
}

async function listFavourites() {
  const places = await db.collection('places').find({}).toArray();
  return places;
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

//SETUP SERVER FUNCTION
async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const server = new ApolloServer({
  //typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  typeDefs: fs.readFileSync('./server/placeSchema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

(async function () {
  try {
    await connectToDb();
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
