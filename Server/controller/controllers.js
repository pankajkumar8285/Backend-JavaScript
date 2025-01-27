const Todo = require('../Models/Todos');

exports.getTasks = async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
  };
  
  exports.postTasks = async (req, res) => {
    const { name } = req.body;
    const newTodo = new Todo({ name });
    await newTodo.save();
    res.json(newTodo);
  };
  
  exports.putTasks = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedTodo);
  };
  
  exports.deleteTasks = async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted successfully' });
  };

