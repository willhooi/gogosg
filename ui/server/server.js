const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/caifantracker'; //initialize db

// Atlas URL  - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb+srv://UUU:PPP@cluster0-XXX.mongodb.net/issuetracker?retryWrites=true';

// mLab URL - replace UUU with user, PPP with password, XXX with hostname
// const url = 'mongodb://UUU:PPP@XXX.mlab.com:33533/issuetracker';

let db;

let aboutMessage = "CaiFan API v1.0";

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

//MODIFY ACCORDING TO REQUIREMENTS

const resolvers = {
  Query: {
    about: () => aboutMessage,
    placeList,
  },
  Mutation: {
    setAboutMessage,
    placeAdd,
    addToFavlist,
  },
  GraphQLDate,
};

async function addToFavlist(_, {nameInput}) {

  const result = await db.collection('favlist').insertOne({name: nameInput});
  console.log(result);
}

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

async function placeList() {
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
/*
function issueValidate(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (issue.status === 'Assigned' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}
*/

async function placeAdd(_, { place }) {
  //issueValidate(issue);
  place.created = new Date();
  place.id = await getNextSequence('places');

  const result = await db.collection('places').insertOne(place);
  const savedPlace = await db.collection('places')
    .findOne({ _id: result.insertedId });
  return savedPlace;
}

//SETUP SERVER FUNCTION
async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
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
