import React from 'react';
import {
  ApolloProvider,
  //is a special type of React component that we'll use to provide data to all of the other components.
  ApolloClient,
  // is a constructor function that will help initialize the connection to the GraphQL API server.
  InMemoryCache,
  // enables the Apollo Client instance to cache API response data so that we can perform requests more efficiently.
  createHttpLink,
  //allows us to control how the Apollo Client makes a request. Think of it like middleware for the outbound network requests.
} from "@apollo/client";

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';


// With the preceding code, we first establish a new link to the GraphQL server at its /graphql endpoint with createHttpLink(). We could pass many other options and configuration settings into this function.
const httpLink = createHttpLink({
  // URI stands for "Uniform Resource Identifier."
  uri: "/graphql",
});

// After we create the link, we use the ApolloClient() constructor to instantiate the Apollo Client instance and create the connection to the API endpoint. We also instantiate a new cache object using new InMemoryCache(). We could customize this to the application, but by default, it works well for this purpose
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


function App() {
  return (
    // Note how we wrap the entire returning JSX code with <ApolloProvider>. Because we're passing the client variable in as the value for the client prop in the provider, everything between the JSX tags will eventually have access to the server's API data through the client we set up.
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
