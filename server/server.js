const express = require('express');
const { ApolloServer } = require("apollo-server-express");
const { authMiddleware } = require("./utils/auth");
const path = require("path");


// import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({
    // With the new ApolloServer() function, we provide the type definitions and resolvers so they know what our API looks like and how it resolves requests.
    typeDefs,
    resolvers,
    context: authMiddleware, //This ensures that every request performs an authentication check, and the updated request object will be passed to the resolvers as the context.
  });
  // Start the Apollo server
  await server.start();
  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });
  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

  // Serve up static assets
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  }

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
};

// Initialize the Apollo server
startServer();