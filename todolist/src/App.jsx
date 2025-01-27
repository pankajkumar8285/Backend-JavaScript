import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  let [todolist, setTodolist] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5500/api/todos')
      .then((response) => {
        setTodolist(response.data);
      })
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const saveToDoList = async (event) => {
    event.preventDefault();
    let toname = event.target.toname.value;

    if (toname && !todolist.some(todo => todo.name === toname)) {
      try {
        const response = await axios.post('http://localhost:5500/api/todos', { name: toname });
        setTodolist([...todolist, response.data]);
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    } else if (!toname) {
      alert('Please enter a To-Do name.');
    } else {
      alert('To-Do name already exists.');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5500/api/todos/${id}`);
      setTodolist(todolist.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const response = await axios.put(`http://localhost:5500/api/todos/${id}`, { status: !currentStatus });
      setTodolist(todolist.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const list = todolist.map((todo, index) => (
    <ToDoListItems
      value={todo.name}
      key={todo._id}
      indexNumber={index}
      id={todo._id}
      status={todo.status}
      deleteTodo={deleteTodo}
      toggleStatus={toggleStatus}
    />
  ));

  return (
    <div className='App'>
      <h1>ToDo List</h1>
      <form onSubmit={saveToDoList}>
        <input type="text" name="toname" /> <button>Save</button>
      </form>
      <div className='outerDiv'>
        <ul>
          {list}
        </ul>
      </div>
    </div>
  );
}

function ToDoListItems({ value, id, indexNumber, status, deleteTodo, toggleStatus }) {
  return (
    <li className={status ? 'completetodo' : ''} onClick={() => toggleStatus(id, status)}>
      {indexNumber + 1}. {value}
      <button className='delete-button'
        onClick={(event) => {
          event.stopPropagation(); 
          deleteTodo(id);
        }}
      >
        Delete
      </button>
    </li>
  );
}

export default App;

