import React, { useEffect, useState } from 'react'
import { useNewNote } from './App';
import axios from 'axios';
import NoteTaking from './NoteTaking';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const { newNote, setNewNote ,setName} = useNewNote();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedin, setIsLoggedin] = useState('');
    const [token,setToken]=useState('');
    const navigate = useNavigate();
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:5000/login', { username, password });
       
        const token = response.data.token;
        setIsLoggedin(token)
        // Save the token in local storage
        localStorage.setItem('token', token);
   // Reload the page after successful login
  
        setToken(token);
        
        
        setName(1) 
        alert('Login successful!');
        
        
      } catch (error) {
        console.error('Login error:', error.message);
        setIsLoggedin(false);
      }
      
    };
    useEffect(() => {
      
  
      
    }, [newNote]);
  
    return (
      <>
      <div className='bg-gradient-to-r from-yellow-500 to-pink-500 h-screen flex justify-center items-center'>
      <div className="max-w-md mx-auto  p-6 bg-white rounded-md shadow-md  border-blue-200">
      <h2 className="text-3xl bg-gradient-to-r from-yellow-500 to-pink-500 text-center mb-6 bg-clip-text text-transparent">Login</h2>

        <label className="block text-sm font-medium text-gray-600">
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"/>
        </label>
        <label className="block text-sm font-medium text-gray-600">
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </label>
        <button onClick={handleLogin}  className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-4">Login</button>
        {isLoggedin ? (
          navigate('/')
        ) : <p className="text-red-500 text-center mt-4">Please Login</p>}
      </div>
      </div>


</>

    );
  };

export default LoginForm