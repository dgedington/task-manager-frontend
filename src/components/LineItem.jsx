import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';


const LineItem = ({ task, token, url, handleCheck, handleDelete, setShowEdit, setEditTask, setEditTaskId }) => {

  const handleClick = (e) => {
    setEditTaskId((e.target.nextSibling.innerText).slice(9))
    setEditTask(e.target.innerText)
    setShowEdit(true)
  }

  return (<React.Fragment>
      <li className='flex w-full justify-between m-2 items-center'>
          <div className='mr-2 pr-2'>
            <input className="accent-blue-200 bg-blue-100 rounded-sm" type="checkbox" checked={task.completed} onChange={() => handleCheck(task._id, token, url)}/>
          </div>
          <div className='flex flex-col text-left bg-blue-100 rounded-md w-full m-2 p-2' onClick={(e) => handleClick(e)} >
              <h2 role={'button'} className='text-2xl bg-blue-300 rounded-md p-1 mb-1' style={(task.completed) ? { textDecoration: 'line-through'} : null } >{task.description}</h2>
              <p className='text-sm p-0.5'>Task Id: {task._id}</p>
              <p className='text-sm p-0.5'>Created: {task.createdAt}</p>
              <p className='text-sm p-0.5'>Updated: {task.updatedAt}</p>
          </div>
          <div className='text-2xl ml-2 pl-1'>
              <FaTrashAlt role="button" tabIndex="0" onClick={() => handleDelete(task._id, token, url)} />
          </div> 
        </li>
  </React.Fragment>    
  )
}

export default LineItem