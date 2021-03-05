import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { backendUrl } from "../config";


//component is called Todo, but is actually for rendering the list of todos.
//move the logic for rendering all the todos into the todolist component and make each todo into this todo component.
const Todo = ({ text0,isComplete,id,index,cwId, date, completeTodo, removeTodo, updateTodo, careWorkers }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });
  const [careWorkerId, setCareWorkerId] = useState(cwId);
  const [text, setText] = useState(text0);

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  const updateDb = careWorkerId => {
    const data = {
      taskId: id,
      // change with edited text
      text,
      careWorkerId: Number(`${careWorkerId}`)
    }
    console.log(data);
    fetch(`${backendUrl}/task`,
    {method: "PUT", body: JSON.stringify(data), headers: { "Content-Type": "application/json" }});
  }

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }


  const careWorkerOptions = careWorkers.map(x => <option key={`careworker-${Math.floor(Math.random() * 10000)}`} value={x.careWorkerId}>{x.firstName}</option>);
  
  return (
    
    <div
      className={isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={id} onClick={() => completeTodo(id)}>
        <h2>{text0}</h2> 
        <br></br>
        <h5><b>Due Time:</b></h5> {date}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(id)}
          className='delete-icon'
        />
    
        <TiEdit
          onClick={() => setEdit({ id: id, value: text0 })}
          className='edit-icon'
        />
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label></Form.Label>
          <Form.Control value={careWorkerId} onChange={e => {
            setCareWorkerId(e.target.value);
            updateDb(e.target.value); //value will be the id of the new careworker who is assigned this todo
          }}
          as="select">
            {careWorkerOptions}
          </Form.Control>
        </Form.Group>
        
      </div>
    </div>
  );
};

export default Todo;