import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Todolist from './components/TodoList/TodoList';

function App() {

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState('');
  const [saving, setSaving] = useState(false);
  function onChange(e)
  {
    const value = e.target.value;
    setNewTodo(value);
  }

  function addTodo(e){
    e.preventDefault();
    const value = {
      userId: 3,
      id: Math.floor(Math.random() * 100) +1,
      title: newTodo,
      completed: false
    }
    setSaving(true);
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    }).then((response) => response.json())
      .then((result) => {
        setTodos(todos.concat({...result, id: value.id}))
        setSaving(false);
      })
  }
  useState(()=>{
    async function fetchData(){
      const result = await fetch('https://jsonplaceholder.typicode.com/todos').then((response)=>
        response.json()
      );
      setTodos(result.slice(0, 5));
      setLoading(false);
    }
    fetchData();
  });
  return (
    <div className="App">
      <h1 className="header">TDD Todolist</h1>      
      {loading ? 'Loading' : <Todolist todos={todos}/>}
      {saving ? "Saving" : (
        <form className="add-todo-form" inSubmit={addTodo}>
          <input type="text" onChange={onChange}/>
          <button type='submit'>Add new todo</button>
        </form>
      )}
    </div>
  );
}

export default App;
