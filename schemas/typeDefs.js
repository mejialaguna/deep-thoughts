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

  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): User
    addUser(username: String!, email: String!, password: String!): User
  }
`;
//  Remember, though, that GraphQL demands that we explicitly define the type of data that is returning

// -----------------------line 25 && 27--------------------------
// the exclamation point ! after the query parameter data type definitions? That indicates that for that query to be carried out, that data must exist. Otherwise, Apollo will return an error to the client making the request and the query won't even reach the resolver function associated with it. name and id using ! if it exist

// Earlier, we didn't enforce a query parameter for thoughts because it wasn't necessary for the query to work. If there's no parameter, we simply return all thoughts. But if we want to look up a single thought or user, we need to know which one we're looking up and thus necessitate a parameter for us to look up that data.

module.exports = typeDefs;
