const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    default: 1,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      //select: false,
    },
  ],
  messages: [
    {
      id: {
        type: Number,
        required: true,
      },
      created: {
        type: Date,
        default: Date.now,
      },
      sender: {
        username: {
          type: String,
          required: true,
        },
        displayName: {
          type: String,
          required: true,
        },
        profilePic: {
          type: String,
          required: true,
        },
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
