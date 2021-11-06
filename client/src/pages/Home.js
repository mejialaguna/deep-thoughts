import React from 'react';
// With these statements, we're importing the useQuery Hook from Apollo Client. This will allow us to make requests to the GraphQL server we connected to and made available to the application using the <ApolloProvider> component in App.js
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from "../utils/queries";
import Auth from "../utils/auth";
import ThoughtList from "../components/ThoughtList";
import FriendList from '../components/FriendList';


const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // Apollo's @apollo/client library provides a loading property to indicate that the request isn't done just yet. When it's finished and we have data returned from the server, that information is stored in the destructured data property.
  const thoughts = data?.thoughts || []; //What we're saying is, if data exists, store it in the thoughts constant we just created. If data is undefined, then save an empty array to the thoughts component. Due to the asynchronous nature of the request, the first few logs printed are empty arrays. At those moments, data was undefined, and we used an empty array as the fallback. Once the query was complete and data actually held information, we accessed its thought property and logged that data instead, revealing all of the content the query asked for.
  console.log(thoughts);
  // Next we'll get the thought data out of the query's response, because every GraphQL response comes in a big data object. In this case, we'll need to access data.thoughts

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title={`Some Feed for ${ thoughts.lenght === 1 ? "thought" : "thoughts" } `}
            />
          )}
        </div>

        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
