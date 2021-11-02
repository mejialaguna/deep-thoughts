const { User, Thought } = require("../models");

const resolvers = {
  Query: {
    thoughts: async (parent, { username }) => {
      // We use a ternary operator to check if username exists. If it does, we set params to an object with a username key set to that value. If it doesn't, we simply return an empty object.
      const params = username ? { username } : {};
      // Now when we query thoughts, we will perform a .find() method on the Thought model. We're also returning the thought data in descending order, as can be seen in the .sort()
      return Thought.find(params).sort({ createdAt: -1 });
    },
    // Did you notice that we only get back the data for the fields we explicitly list? Again, this allows us to use one query to retrieve as much or as little data as we need from a resource from typeDefs file.
    // place this inside of the `Query` nested object right after `thoughts`
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    // get all users
    users: async () => {
      return User.find()
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
  },
};

module.exports = resolvers;
