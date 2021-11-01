// import the gql tagged template function
const { gql } = require("apollo-server-express");

// Remember that with GraphQL, we access our API through two passages: queries and mutations. 
// To define a query, you use the type Query {} data type, which is built into GraphQL.From there, you can define your different types of queries by naming them, just as you would name a function in JavaScript
const typeDefs = gql`
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Query {
    thoughts(username: String): [Thought]
  }
`;
//  Remember, though, that GraphQL demands that we explicitly define the type of data that is returning

module.exports = typeDefs;
