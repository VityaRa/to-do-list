const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  creationDate: { type: Date, default: new Date() },
  isDone: { type: Boolean },
  description: { type: String },
  finishDate: { type: Date, default: null },
  _id: { type: Schema.Types.ObjectId },
});

const listSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId },
  items: { type: Schema.Types.ObjectId, ref: 'Item' },
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  lists: { type: Schema.Types.ObjectId, ref: 'List' },
});

module.exports = { User: mongoose.model("User", userSchema), List: mongoose.model("List", listSchema), Item: mongoose.model("Item", itemSchema) };