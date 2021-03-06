import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Default from '../assets/default.png';
import api from '../api/axios';
import SelectFileButton from '../components/SelectFileButton';

const Profile = ({ user, setUser, setValidUser, token, avatar, setAvatar, url }) => {
        const [menu, setMenu] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            const fetchProfile = async () => {
                try {
                    const response = await api.get('/users/me', { headers: { 'Authorization': `Bearer ${token}`}} )
                    setUser(response.data);
                    setAvatar(`${url}/users/${user._id}/avatar`);
                } catch (err) {
                    console.log(err)
                    setValidUser(false)
                    navigate("/");
                }
            } 

            fetchProfile();

        }, [user, setUser, token, navigate, setAvatar, setValidUser, url])

        return (<React.Fragment>
            <div className='flex flex-col w-screen h-screen items-center justify-start align-middle'>
                <div className="flex flex-col bg-blue-500 shadow-md rounded px-8 pt-6 pb-8 mt-8 mb-4 align-center">
                <img className="mb-4" src={avatar} onError={() => setAvatar(Default)} alt='user'/>
                    <h1 className='text-4xl mb-4' ><strong>{user.name}</strong></h1>
                    <p><strong>User Id:</strong> {user._id}</p>
                    <p><strong>Age:</strong> {user.age}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Create:</strong> {user.createdAt}</p>
                    <p className='mb-3' ><strong>Updated:</strong> {user.updatedAt}</p>
                    <button className="bg-white hover:bg-blue-100 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => navigate("/profile/edit")}>Edit</button>
                </div>
                {!menu ? ( 
                    <div className='ml-4'>
                    <button className="bg-blue-500 hover:bg-blue-100 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setMenu(!menu)}>Image</button>
                </div>
                ) : (
                    <div className='ml-4'>
                    <SelectFileButton
                        url={url}
                        token={token}
                        user={user}
                        menu={menu}
                        setMenu={setMenu}
                        setAvatar={setAvatar}
                    />
                </div>
                )}
            </div>
          </React.Fragment>
    )
}

export default Profile