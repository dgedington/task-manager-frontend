import React from 'react'
import LineItem from './LineItem'

const ItemList = ({ tasks, token, url, handleCheck, handleDelete, setShowEdit, setEditTask, setEditTaskId }) => {
  return (<React.Fragment>
    <ul className='flex flex-col h-auto w-full max-w-[500px] bg-blue-500 p-6 pt-8 content-center'>
    {tasks.map((task) =>(
                    <LineItem
                        key={task._id}
                        task={task}
                        token={token}
                        url={url}
                        handleCheck={handleCheck}
                        handleDelete={handleDelete}
                        setShowEdit={setShowEdit}
                        setEditTask={setEditTask}
                        setEditTaskId={setEditTaskId}
                    />
                ))}   
    </ul>
  </React.Fragment>
  )
}

export default ItemList