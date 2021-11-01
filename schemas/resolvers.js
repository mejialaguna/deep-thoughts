const { User, Thought } = require("../models");

const resolvers = {
  Query: {
    thoughts: async () => {
      // Now when we query thoughts, we will perform a .find() method on the Thought model. We're also returning the thought data in descending order, as can be seen in the .sort()
      return Thought.find().sort({ createdAt: -1 });
    },
  },
};

module.exports = resolvers;
