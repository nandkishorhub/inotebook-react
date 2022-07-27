const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  // In order to fetch notes for a user then we need to somehow associate notes with user
  // Here we have associated notes schema with user schema
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

Note = mongoose.model("notes", NotesSchema);
module.exports = Note;
