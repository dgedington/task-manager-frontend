import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from '../components/ItemList';
import api from '../api/axios';


const Tasks = ({ token, url, search }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState('');
  const [editTaskId, setEditTaskId] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks', { headers: { 'Authorization': `Bearer ${token}`}} )
            setTasks(response.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err)
        }
    } 

    fetchTasks();

})

const handleCheck = async (id, token, url) => {
  const listTasks = tasks.map((task) => task._id === id ? { ...task, completed: !task.completed } : task);
  setTasks(listTasks);

  const myTask = listTasks.filter((task) => task._id === id);
  const UPDATE_URL = `${url}/tasks/${id}`
  const data = JSON.stringify({
    "completed": myTask[0].completed
  });

  const config = {
    method: 'patch',
    url: UPDATE_URL,
    headers: { 
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
    },
    data : data
  };

  try {
    const response = await axios(config);
    console.log(response.status)
  } catch (err) {
    console.log(err)
  }
} 

const handleDelete = async (id, token, url) => {
  const DELETE_URL = `${url}/tasks/${id}`
  const listTasks = tasks.filter((task) => task._id !== id);
  setTasks(listTasks)

  const config = {
    method: 'delete',
    url: DELETE_URL,
    headers: { 
        'Authorization': `Bearer ${token}`
    },
  };

  try {
    const response = await axios(config);
    console.log(response.status)
  } catch (err) {
    console.log(err)
  }
}

const handleClick = async (url, token) => {
  if(!newTask) return;
  const ADD_URL = `${url}/tasks`
  const data = JSON.stringify({
    "description": newTask
  });
  
  const config = {
    method: 'post',
    url: ADD_URL,
    headers: { 
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    },
    data : data
  };

  try {
    const response = await axios(config);

    const myNewId = response.data._id
    const myNewTask = response.data.description

    const listTasks = tasks.map((task) => task._id === myNewId ? { ...task, description: myNewTask } : task);
    setTasks(listTasks);

    
  } catch (err) {
    console.log(err)
  }

  setNewTask('')
}  

const handleSearch = () => {
  const taskList1 = tasks.filter(task => ((task.description).toLowerCase().includes(search.toLowerCase())));
  const taskList2 = tasks.filter(task => ((task._id).includes(search)));
  const taskList3 = tasks.filter(task => ((task.createdAt).includes(search)));
  const newTaskList = new Set([...taskList1, ...taskList2, ...taskList3])
  const taskList = [...newTaskList]
  return taskList
  }

  const handleClickEdit = async (id, edit, token, url) => {
    const listTasks = tasks.map((task) => task._id === id ? { ...task, description: edit } : task);
    setTasks(listTasks);

    const UPDATE_URL = `${url}/tasks/${id}`
    const data = JSON.stringify({
      "description": edit
    });

    const config = {
      method: 'patch',
      url: UPDATE_URL,
      headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
      },
      data : data
    };
  
    try {
      const response = await axios(config);
      console.log(response.status)
    } catch (err) {
      console.log(err)
    }


    setShowEdit(false)
  }

  const handleCancel = () => {
    setEditTask('');
    setShowEdit(false);
  }

  return (<React.Fragment>
    <div className='flex flex-col w-screen h-screen items-center mt-8 mb-6'>
    {showEdit ? (
  <div className='h-auto w-full max-w-[500px]'>
      <form className="bg-blue-500 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => e.preventDefault()}>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description"> Decription</label>
        <input className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 bg-blue-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="New Task" value={editTask} onChange={(e) => setEditTask(e.target.value)} />
        <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => handleClickEdit(editTaskId, editTask, token, url)}>
          Edit Task
        </button>
        <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline px-2 ml-2" type="button" onClick={() => handleCancel()}>
          Cancel
        </button>
      </form>
  </div>
  ) : (<div className='h-auto w-full max-w-[500px]'>
  <form className="bg-blue-500 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => e.preventDefault()}>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description"> Decription</label>
    <input className="shadow appearance-none border rounded w-full mb-3 py-2 px-3 bg-blue-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" type="text" placeholder="New Task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
    <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => handleClick(url, token)}>
      Create Task
    </button>
  </form>
</div>) }
        {isLoading && <p>Loading Items...</p>}
        {(tasks.length !== 0 && isLoading === false) && (
        <ItemList
          tasks={handleSearch()}
          token={token}
          url={url}
          handleCheck={handleCheck} 
          handleDelete={handleDelete}
          setShowEdit={setShowEdit}
          setEditTask={setEditTask}
          setEditTaskId={setEditTaskId}       
        />
    )} { (tasks.length === 0 && isLoading === false) && (
      <p className='mt-2'>Your task list is empty.</p>
  )}
  </div>
    </React.Fragment>
)}

export default Tasks