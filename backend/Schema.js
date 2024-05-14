const mongoose = require('mongoose');
const { Schema } = mongoose;

const Note = mongoose.model("Note", new Schema({ name: String , role: String }));

module.exports = Note ;

