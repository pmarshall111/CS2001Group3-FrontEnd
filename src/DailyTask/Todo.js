import React, { useEffect, useState } from 'react';
// import Form from "react-bootstrap/Form";
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { backendUrl } from "../config";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


//component is called Todo, but is actually for rendering the list of todos.
//move the logic for rendering all the todos into the todolist component and make each todo into this todo component.
const Todo = ({ name,text0,isComplete,id,cwId, date, completeTodo, removeTodo, updateTodo, careWorkers }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });
  const [careWorkerId, setCareWorkerId] = useState(cwId);
  const [text, setText] = useState(text0);
  const [assignedWorker, setAssignedWorker] = useState(`#${cwId} ${name}`);



  const handleSelect=(e) => {
    setCareWorkerId(e);
    updateDb(e); //value will be the id of the new careworker who is assigned this todo
    // window.location.reload(false);
  };
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


  const careWorkerOptions = careWorkers.map(x => <Dropdown.Item key={`careworker-${Math.floor(Math.random() * 10000)}`} onClick={() => setAssignedWorker(`#${x.careWorkerId} ${x.firstName} ${x.surName}`)} eventKey={x.careWorkerId}>{x.firstName}</Dropdown.Item>);
  
  return (
    
    <div
      className={isComplete ? 'todo-row complete' : 'todo-row'}
      key={id}
    >
      <div key={id} onClick={() => completeTodo(id)}>
        <h2>{text0}</h2> 
        <br></br>
        {date?
          <div>
            <h5><b>Due Time:</b></h5> 
            <td>
              {new Intl.DateTimeFormat("en-GB", {
              dateStyle: 'full', 
              timeStyle: 'short'
              }).format(new Date(date))}
            </td>
          </div>
        : "" }
        <br></br>
        <p>
        <h4>Assigned to:</h4>{assignedWorker}
        </p>
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
        <DropdownButton
              alignRight
              title={cwId? "Re-assign" : "Assign worker"} 
              id="dropdown-menu-align-right"
              onSelect={handleSelect}
               >
            {careWorkerOptions}
        </DropdownButton>
      </div>
    </div>
  );
};

export default Todo;