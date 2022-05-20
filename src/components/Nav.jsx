import React from 'react'
import { useNavigate } from 'react-router-dom';

const Nav = ({ search, setSearch, validUser }) => {
  const navigate = useNavigate();

  return (<React.Fragment>
      {validUser && (
      <nav className="flex flex-col md:flex-row w-screen md:min-h-[80px] bg-blue-200 justify-between align-center px-6 py-6">
        <form className="flex flex-col justify-center" onSubmit={(e) => e.preventDefault()}>
          <label className='hidden' htmlFor="search">Search Posts</label>
          <input
            className='p-1'
            id="search"
            name="search"
            type="text"
            placeholder="Search Posts"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <ul className='flex mt-6'>
          <li type='button' onClick={() => navigate("/")} className='flex flex-col px-4 justify-center hover:bg-blue-500'>Landing</li>
          <li type='button' onClick={() => navigate("/tasks")} className='flex flex-col px-4 justify-center hover:bg-blue-500'>Tasks</li>
          <li type='button' onClick={() => navigate("/profile")} className='flex flex-col px-4 justify-center hover:bg-blue-500'>Profile</li>
        </ul>
      </nav>
      )} {!validUser && null }
  </React.Fragment>
  )
}

export default Nav