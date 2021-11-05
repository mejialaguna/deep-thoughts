import React from "react";
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
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import SingleThought from "./pages/SingleThought";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";

// With the preceding code, we first establish a new link to the GraphQL server at its /graphql endpoint with createHttpLink(). We could pass many other options and configuration settings into this function.
const httpLink = createHttpLink({
  // URI stands for "Uniform Resource Identifier."
  uri: "/graphql", //for this to work er also need to
  //open the package.json file in the client directory. Once that's open, add one more key-value pair towards the top of the JSON object "proxy": "http://localhost:3001", check line 1 on the client side json file.
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
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              {/* // The ? means this parameter is optional, so / profile and /
              profile / myUsername will both render the Profile component. */}
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />
              <Route component={NoMatch} />
              {/* e've wrapped all of the Route components in a Switch component and
              included one more Route at the end to render the NoMatch
              component. If the route doesn't match any of the preceding paths
              (e.g., /about), then users will see the 404 message. */}
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
