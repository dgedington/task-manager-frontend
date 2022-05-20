import React, { useState } from 'react'
import axios from 'axios';

function SelectFileButton({ url, token, user, menu, setMenu, setImageSrc }) {
    const UPLOAD_URL = `${url}/users/me/avatar`
    const [selectedFile, setSelectedFile] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = new FormData();
        formData.append("avatar", selectedFile);
        try {
          const response = await axios({
            method: "post",
            url: UPLOAD_URL,
            data: formData,
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
          });

          console.log(response)
          setImageSrc(`${url}/users/${user._id}/avatar`)
        } catch(error) {
          console.log(error)
        }
      }

    const handleFileSelect = (e) => {
        setSelectedFile(e.target.files[0])
      }


    return (
        <div className='flex flex-col mt-5 items-center justify-center' >
            <form className="flex flex-col bg-blue-500 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <input className="form-control block w-full px-2 py-1 text-sm font-normal text-gray-700 bg-blue-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 mb-2 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" onChange={(e) => handleFileSelect(e)}/>
                <input className="bg-white hover:bg-blue-200 text-gray-700 font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mb-2" type="submit" value="Upload File" />
                <input className="bg-white hover:bg-blue-200 text-gray-700 font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline" type="button" value="Close" onClick={() => setMenu(!menu)}/>
            </form>
        </div>
    )
}

export default SelectFileButton