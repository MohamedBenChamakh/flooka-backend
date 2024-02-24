const mongoose = require("mongoose");

const channelSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  streamUrl: { type: String, required: true, unique: true },
  channelId: { type: String },
  epgList: { type: String },

});

module.exports = mongoose.model("Media", channelSchema);