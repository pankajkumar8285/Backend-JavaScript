const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: Boolean, default: false },
  });
  
  const Todo = mongoose.model('Todo', todoSchema);
  module.exports = Todo;
  