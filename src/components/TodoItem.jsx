import React from 'react'

export function TodoItem({ todo, toggleTodo }) {
    const { id, task, complete } = todo;

    const handlerTodoClick = () => {
        toggleTodo(id);
    }

    return (
    <li>
        <input type="checkbox" checked={complete} onChange={handlerTodoClick}></input> 
        {task}
    </li>);
}
