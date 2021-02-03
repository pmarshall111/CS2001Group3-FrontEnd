import React from 'react'
import TodoList from './ToDoList'
import './todo.css';

function TodoPage() {
    return (
        <div>
            <header className="App-header">
                <TodoList />
            </header>
        </div>
    )
}

export default TodoPage
