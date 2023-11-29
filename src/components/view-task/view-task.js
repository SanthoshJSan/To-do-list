import './view-task.css';

import { useState, useEffect } from 'react';
import { Button, Input } from '@mantine/core';

import { fetchToDo, deleteToDo } from '../../APIs/to-do-collection.js';
import { arrayOfObjectSort } from '../../utils/utils.js';

import { TextInput, rem } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const ViewTask = () => {

	  const [newTodoList, setNewTodoList] = useState([]);
  	  const [fetchedTodos, setfetchedTodos] = useState([]);

  	  useEffect(()=>{
	    fetchToDo().then((res)=>{
	      // console.log(res)
	      let data = [...res.data]
	      arrayOfObjectSort(data, 'taskName');
	      console.log(data)
	      setfetchedTodos([...data]);
	      setNewTodoList([...data]);
	    }).catch((res)=>{
	      alert('Error!!!unable to fetch todos.');
	    })
	  },[])

  	    const onDelete = (taskName)=>{
				    deleteToDo(taskName).then((res)=>{
				      alert('Delete Successfully');
				      fetchToDo().then((res)=>{
				      // console.log(res)
				      setNewTodoList([...res.data]);
				    })
				      // console.log(res)
				    }).catch((err)=>{
				      alert(err.response.data);
				    })
				  }

		const onFilter = (subStr)=> {
			// console.log( subStr);
			if(subStr === '')
				setNewTodoList([...fetchedTodos])
			else
				setNewTodoList(fetchedTodos.filter((item)=> item.taskName.toLowerCase().includes(subStr.toLowerCase())))
		}

	return(
		<>
			<TextInput
		      radius="xl"
		      size="md"
		      placeholder="Search tasks"
		      rightSectionWidth={42}
		      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
		      className='mt-5'
		      onChange={(event)=> onFilter(event.target.value)}
		    />
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
		</>
		);
}

export default ViewTask;