const { Schema, model } = require("mongoose");
const friendsSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    }
  },

  {
    toJSON: {
      getters: true,
    },
  }
);

const Friend = model("Friend", friendsSchema);

module.exports = Friend;
