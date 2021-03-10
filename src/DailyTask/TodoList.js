import React, { useState , useEffect} from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { backendUrl } from "../config";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [careWorkers, setCareWorkers] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/careWorker/all?careHomeId=7`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
           if (!response.status || response.status === 200) {
            setCareWorkers(response)
            }
        })

    fetch(`${backendUrl}/task/all?careHomeId=7`)
        .then(response => response.json())
        .then(response => {
              console.log(response)
            if (!response.status || response.status === 200) {
              setTodos(response)
            }
        })  
  }, [])

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
    fetch(`${backendUrl}/task`,
    {method: "POST", body: JSON.stringify({text:todo.text}), headers: { "Content-Type": "application/json" }});
    console.log(JSON.stringify({text:todo.text}));
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].filter(todo => todo.id !== id);

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };
  
  const listOfTodos = todos.map((x, index) => <Todo 
                                      id = {x.taskId}
                                      isComplete = {x.isComplete}
                                      text0 = {x.text}
                                      todos={todos}
                                      date={x.dueTime}
                                      cwId = {x.careWorkerId}
                                      name={x.careWorkerName}
                                      careWorkers={careWorkers}
                                      completeTodo={completeTodo}
                                      removeTodo={removeTodo}
                                      updateTodo={updateTodo}
                                      key = {index}  />)
  
//return (<div>{listOfTodos}</div>)

  return (
    
    <>
      <h1>Today's Tasks</h1>
      <TodoForm onSubmit={addTodo} />
      <div>{listOfTodos}</div>
    </>
  );
}

export default TodoList;