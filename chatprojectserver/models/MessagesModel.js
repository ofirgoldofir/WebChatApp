// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const messageSchema = new Schema({
//   id: {
//     type: Number,
//     required: true,
//     unique: true,
//     default: 1,
//   },
//   created: {
//     type: Date,
//     default: Date.now,
//   },
//   sender: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//     select: false,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
// });

// const Message = mongoose.model("Message", messageSchema);

// module.exports = Message;
