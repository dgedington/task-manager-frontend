import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login = ({ setToken, validUser, setValidUser, setUser, url }) => {
  const userEmail = localStorage.getItem("userEmail");
  const userPass = localStorage.getItem("password");
  const [email, setEmail] = useState(userEmail || "");
  const [pwd, setPwd] = useState(userPass || ""); 
  const navigate = useNavigate();
  const login_url = `${url}/users/login`
  const handleClick = () => {

    async function login_function(login_url, email, pwd) {
      const data = JSON.stringify({
          "email": email,
          "password": pwd
        });
        
      const config = {
          method: 'post',
          url: login_url,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        const res = await axios(config)
        return res
      }
      
      login_function(login_url, email, pwd)
      .then(response => {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("password", pwd);
        setUser(response.data.user);
        setToken(response.data.token);
        localStorage.setItem("userToken", response.data.token);
        setValidUser(true);
      }).catch (error => {
        console.log(error)
      })  
    }
  
  return (<React.Fragment>
    {validUser && (<div className='flex flex-col w-screen h-screen items-center'>
      <h2 className='text-2xl my-6'>You are loggin in</h2>
      <button className='rounded-full bg-[#66d8f5] text-2xl p-4' onClick={() => navigate("/")}>Landing</button>
    </div>)}
    {!validUser && (
      <div className='flex flex-col w-screen h-screen items-center align-middle'>
        <form  className="bg-blue-500 shadow-md rounded px-8 pt-6 pb-8 mt-8 mb-4" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uemail">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="uemail" type="text" placeholder="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="password" value={pwd} autoComplete="current-password" onChange={(e) => setPwd(e.target.value)}/>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleClick}>
              Sign In
            </button>
          </div>      
        </form>
        <p className='mb-2' >Return to Landing.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" type="button" onClick={() => navigate("/")}>Landing</button>
        <p className='mb-2' >Create new account.</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => navigate("/register")}>Register</button>
      </div>
      )}
  </React.Fragment>
  )
}

export default Login