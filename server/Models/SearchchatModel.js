const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      required: true,
    },
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const chatModel = mongoose.model("chats", chatSchema);

module.exports = chatModel;
