import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { fetchToDo, insertToDo, deleteToDo } from './APIs/to-do-collection.js';

import { Button, Input } from '@mantine/core';
import { DateInput } from '@mantine/dates';


function App() {

  const [inputValue, setInputValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [fetchedTodos, setfetchedTodos] = useState([]);
  const [newTodoList, setNewTodoList] = useState([]);


  useEffect(()=>{
    fetchToDo().then((res)=>{
      // console.log(res)
      setfetchedTodos([...res.data]);
      setNewTodoList([...res.data]);
    })
  },[])

  const onDelete = (taskName)=>{
    deleteToDo(taskName).then((res)=>{
      alert('Delete Successfully');
      fetchToDo().then((res)=>{
      // console.log(res)
      setfetchedTodos([...res.data]);
      setNewTodoList([...res.data]);
    })
      // console.log(res)
    }).catch((err)=>{
      alert(err.response.data);
    })
  }

  const parseDate = (dateObj)=>{
    // console.log(dateObj.getDate())
    const date = dateObj.getDate();
    const month = dateObj.getMonth()+1;
    const year = dateObj.getFullYear();
    setDateValue(`${date}/${month}/${year}`);
  }

  const onSave = (event)=>{
    insertToDo(todoList).then((res)=>{
      // console.log(res)
      alert("Successfully saved!!!")
    }).catch(err=>{
      // console.log(err.response.data);
      alert(err.response.data);
    })
  }

  const setList = (event)=>{
    if(inputValue!='' && dateValue!=''){
      setTodoList(state=>[...state, {taskName: inputValue, date: dateValue} ])
      setNewTodoList(state=>[...state, {taskName: inputValue, date: dateValue} ] )
    }
  }

  return (
    <div className="App container">
      <h1 className='text-center'>To-do</h1>
      <div className='mt-5'>
       <div className='d-flex justify-content-between'>
          <Input placeholder="to-do name"
          onChange={(event) => setInputValue(event.currentTarget.value)}/>
          <DateInput onChange={(event) => parseDate(event)}
              placeholder="due date"
            />
          <Button variant="filled" color="cyan"
          onClick={setList}>Add</Button>
       </div>
       <div className='table mb-0 mt-4' style={{height: '50vh', overflow: 'auto', border: '1px solid grey'}}>
          <table className='w-100'>
            <thead style={{position:'sticky',top: '0px'}}>
              <tr>
                <th>Task</th>
                <th>ETA</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {newTodoList.map((item,i)=>
                <tr key={i}>
                  <td>{item.taskName}</td>
                  <td>{item.date}</td>
                  <td><Button variant="filled" color="red" 
                       onClick={()=>onDelete(item.taskName)}
                      >delete</Button></td>
                </tr>)
              }
            </tbody>
          </table>
       </div>
        <div className='d-flex justify-content-end mt-1'>
          <Button variant="filled" color="green" 
             onClick={onSave}
            >Save</Button>
        </div>  
      </div>
    </div>
  );
}

export default App;
