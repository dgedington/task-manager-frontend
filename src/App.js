import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Tasks from './pages/Tasks';
import Header from './components/Header';
import useWindowSize from './Hooks/useWindowSize';
import Nav from './components/Nav';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import api from './api/axios';

function App() {
  const userToken = localStorage.getItem("userToken");
  const [token, setToken] = useState(userToken || '');
  const [user, setUser] = useState({});
  const [search, setSearch] = useState('');
  const [validUser, setValidUser] = useState(false);
  const url = 'https://dgeding-task-manager.herokuapp.com';
  const { width } = useWindowSize();

  useEffect(() => {
    if (userToken) {
      setValidUser(true);
      const fetchProfile = async () => {
        try {
          const response = await api.get('/users/me', { headers: { 'Authorization': `Bearer ${token}`}} )
          setUser(response.data);
        } catch (err) {
          console.log(err)
        }
      } 

      fetchProfile();
    }
  }, [token, userToken])

  return (
    <main className='w-screen h-screen'>
      <div className='top-0 sticky'>
        <Header
          title='Task Manager App'
          width={width}
        />
        <Nav
          search={search}
          setSearch={setSearch}
          validUser={validUser} 
        />
      </div>
      <Routes>
        <Route exact path="/" element={<Landing
                                          validUser={validUser}
                                          setValidUser={setValidUser}
                                          user={user}
                                          token={token}
                                          setToken={setToken}
                                          url={url}  
                                        />}
        />
        {!validUser && (
        <Route exact path="/login" element={<Login
                                                setToken={setToken}
                                                validUser={validUser}
                                                setValidUser={setValidUser}
                                                setUser={setUser}
                                                url={url}
                                                />}
        /> )}
        {!validUser && (
        <Route exact path="/register" element={<Register
                                                  setToken={setToken}
                                                  validUser={validUser}
                                                  setValidUser={setValidUser}
                                                  setUser={setUser}
                                                  url={url}      
                                              />}
        />  
        )}
        {validUser && (
        <Route exact path="/tasks" element={<Tasks
                                              token={token}
                                              url={url}
                                              search={search}
                                            />}
        /> )}
        {validUser && (
        <Route exact path="/profile" element={<Profile
                                              user={user}
                                              setUser={setUser}
                                              token={token}
                                              url={url}
                                            />}
        /> )}
        {validUser && (
        <Route exact path="/profile/edit" element={<EditProfile
                                              user={user}
                                              setUser={setUser}
                                              token={token}
                                              url={url}
                                            />}
        /> )}
         <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </main>
  );
}

export default App;
