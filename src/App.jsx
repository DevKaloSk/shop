import React, { Fragment, useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodoList'

const KEY_TASK = 'todoApp.todos';

export function App(){
  const[todos, setTodos] = useState([]);

  const todoTaskRef = useRef();

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(KEY_TASK));
    if(storedTodos){
      setTodos(storedTodos);
    }
  }, []);

  useEffect(()=>{
    localStorage.setItem(KEY_TASK, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) =>{
    const newTodos = [... todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if(task === '') return;
    setTodos((prevTodos)=>{
      return [... prevTodos, {id: uuidv4(), task, complete: false}]
    });
    todoTaskRef.current.value=null;
  }

  const handleClearAll = () => {
    const newTodos = todos.filter((todo)=>!todo.complete);
    setTodos(newTodos);
  }

  return (
    <Fragment>
      <TodoList  todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea"/>
      <button onClick={handleTodoAdd}>+</button>
      <button onClick={handleClearAll}>-</button>
      <div>Te quedan {todos.filter((todo)=>!todo.complete).length} tareas por terminar</div>
    </Fragment>
  );
}