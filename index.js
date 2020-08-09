require('dotenv').config();
const { makeExecutableSchema } = require('graphql-tools');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const resolvers = require('./lib/resolvers');

const app = express()
const port = process.env.port || 3000

const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'), 'utf-8'
);
// Defining the schema. Types can be: String, Integer, Float, Boolean
const schema = makeExecutableSchema({
  typeDefs, resolvers
})


app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => {
  console.log('Listening in http://localhost:3000')
})
