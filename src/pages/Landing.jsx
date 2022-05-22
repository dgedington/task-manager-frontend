import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Landing = ({ validUser, setValidUser, user, token, setToken, url }) => {
  const navigate = useNavigate();
  const logout_url = `${url}/users/logout`;
  const name = user.name;

  const handleClick = () => {

    async function logout_function(logout_url, token) {
        
      const config = {
          method: 'post',
          url: logout_url,
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
        
        const res = await axios(config)
        return res
      } 
      
      
      logout_function(logout_url, token)
      .then(response => {
        console.log(response.status)
        localStorage.removeItem("userToken");
        setToken('');
        setValidUser(false);
      }).catch (error => {
        console.log(error)
      })  
    }
   
  const handleDelete = () => {
    console.log('Click Click')
  }  



  return (<React.Fragment>
        <div className='flex flex-col w-screen h-screen items-center'>
          <div className="flex flex-col judtify-center items-center max-w-lg rounded overflow-hidden shadow-lg bg-blue-500 p-8 mb-8 mt-16">
            <h1 className='text-4xl my-6'>Welcome to Task Manager</h1>
            {validUser === false && (<h2 className='text-2xl my-6'>You are not logged in</h2> )} 
            {validUser === true && (<h2 className='text-2xl my-6'>You are logged in as {name}</h2> )}
          </div>
          {validUser === false && (<p className='mb-2' >Already Registered?</p>)}
          {validUser === false && (<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate("/login")}>Login</button>)}
          {validUser === false && (<p className='mb-2' >Create account now.</p>)}
          {validUser === false && (<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate("/register")}>Register</button>)}
          {validUser === true && (<p className='mb-2' >Sign out here</p>)}
          {validUser === true && (<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mb-2" onClick={handleClick} >Logout</button> )}
          {validUser === true && (<p className='mb-2' >Delete Account</p>)}
          {validUser === true && (<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline" onClick={handleDelete} >Delete</button> )}
        </div>
    </React.Fragment>
  )
}

export default Landing