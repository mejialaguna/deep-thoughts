import React from 'react';
// This component, Redirect, will allow us to redirect the user to another route within the application. Think of it like how we've used location.replace() in the past, but it leverages React Router's ability to not reload the browser!
import { Redirect, useParams } from "react-router-dom";
import ThoughtList from "../components/ThoughtList";
import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import FriendList from '../components/FriendList';
import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  // Now if there's a value in userParam that we got from the URL bar, we'll use that value to run the QUERY_USER query. If there's no value in userParam, like if we simply visit /profile as a logged-in user, we'll execute the QUERY_ME query instead.
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }


// if you navigate to /profile and you aren't logged in? This could very easily happen 
// by mistake and, unfortunately, the page breaks if we do !
  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links
        above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row mb-3">
        {/* Another enhancement that we can make is to adjust the messaging
        displayed to a user on their profile page. Let's change some of the JSX
        code regarding whose profile we're viewing by adding */}
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList
            thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`}
          />
        </div>
        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
