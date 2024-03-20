const fs = require('fs');
const express = require('express');
const { ApolloServer} = require('apollo-server-express');

//write resolver
//start GQL server
//STB API URL: https://api.stb.gov.sg/content/food-beverages/v2/search
//API key:gS8i7oE7GLfMLZnnA0tZOwXTNSDgPqwB
//params: searchType=keyword&searchValues=economy%20rice


//Start Express server
const app = express();
app.use(express.static('public'));

( function () {
  try {
    app.listen(3000, function () {
      console.log('App started on port 3000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();