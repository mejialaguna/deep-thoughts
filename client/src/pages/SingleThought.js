import React from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHT } from "../utils/queries";
import ReactionList from "../components/ReactionList";

const SingleThought = props => {
  const { id: thoughtId } = useParams();
  console.log(thoughtId);

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
    // This is how you can pass variables to queries that need them. The id property on the variables object will become the $id parameter in the GraphQL query.
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{" "}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>
      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}
      {/* We combined this with a thought.reactionCount > 0 expression to prevent
      rendering the reactions if the array is empty. */}
    </div>
  );
};

export default SingleThought;
