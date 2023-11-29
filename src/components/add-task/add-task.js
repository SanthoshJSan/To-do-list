import { useState, useEffect } from 'react';

import { fetchToDo, insertToDo, deleteToDo } from '../../APIs/to-do-collection.js';

import { Button, Input } from '@mantine/core';
import { DateInput } from '@mantine/dates';

import './add-task.css';

const AddTask = ()=>{

  const [newTodoList, setNewTodoList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [todoList, setTodoList] = useState([]);


  const onDelete = (taskName)=>{
  	setTodoList(state=> {
  		let temp = [...state];
  		temp.splice(temp.findIndex((el) => el.taskName === taskName), 1 );
  		return [...temp];
  })
  	// console.log([...todoList]);
  }

  const parseDate = (dateObj)=>{
    // console.log(dateObj.getDate())
    const date = dateObj.getDate();
    const month = dateObj.getMonth()+1;
    const year = dateObj.getFullYear();
    setDateValue(`${date}/${month}/${year}`);
  }

  const onSave = (event)=>{
  	if(todoList.length > 0)
    insertToDo(todoList).then((res)=>{
      // console.log(res)
      alert("Successfully saved!!!")
      setTodoList([])
    }).catch(err=>{
      // console.log(err.response.data);
      alert(err.response.data);
    })
  }

  const setList = (event)=>{
    if(inputValue!='' && dateValue!=''){
      setTodoList(state=>[...state, {taskName: inputValue, date: dateValue} ])
    }
  }

	return (
	<div className='mt-5 h-100'>
       <div className='d-flex justify-content-between flex-wrap'>
          <Input placeholder="to-do name"
          onChange={(event) => setInputValue(event.currentTarget.value)}/>
          <DateInput onChange={(event) => parseDate(event)}
              placeholder="due date"
            />
          <Button variant="filled" color="cyan"
          onClick={setList}>Add</Button>
       </div>
       <div className='table mb-0 mt-4' style={{minHeight: '300px', maxHeight: '60vh', minWidth: '500px', overflow: 'auto', border: '1px solid #d1d1d3'}}>
          <table className='w-100'>
            <thead style={{position:'sticky',top: '0px'}}>
              <tr>
                <th>Task</th>
                <th>ETA</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todoList.map((item,i)=>
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
      </div>)
}

export default AddTask;