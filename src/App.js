import React, { createContext, useContext, useEffect, useState } from 'react';
import NoteTaking from './NoteTaking';

import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import SignupForm from './SignupFrom';
import LoginForm from './LoginForm';
import { FaUser } from 'react-icons/fa';
import { GiNotebook } from "react-icons/gi";
import axios from 'axios';
// Create the context
const NewNoteContext = createContext();

// Create a hook to use the context
export const useNewNote = () => {
  const context = useContext(NewNoteContext);
  if (!context) {
    throw new Error('useNewNote must be used within a NewNoteProvider');
  }
  return context;
};
const handleLogout = () => {
  // Remove the token from local storage
  localStorage.removeItem('token');

  // Assuming you have a function like setToken to update the state
  // setToken('');

  alert('Logout successful!');

  // Reload the page
  window.location.reload();
};
// Create the provider component
export const NewNoteProvider = ({ children }) => {
  const [newNote, setNewNote] = useState(0);

  const value = {
    newNote,
    setNewNote,
  };

  return (
    <NewNoteContext.Provider value={value}>
      {children}
    </NewNoteContext.Provider>
  );
};


function App() {
  const [username,setUsername]=useState('');
  

 
  //for authentication
useEffect(() => {
  const Authentication = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");

      // Check if the token exists before making the request
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      // Make the authentication request with the retrieved token
      const userdata = await axios.post(
        "http://localhost:5000/authentication",
        { token }
      );
     
      setUsername(userdata?.data?.usertoken?.username
        );
        
      
    } catch (error) {
      console.error("Note not created", error.message);
    }
  };

  // Call the Authentication function
  Authentication();

}, []); 

  return (
    <NewNoteProvider >
      <Router>
      <div>
        
        <nav className='flex w-full bg-red-100 h-12 text-center items-center justify-center space-x-4 '>
        <GiNotebook className='text-4xl text-red-800 ' />Note App
          <ul className='flex w-11/12 bg-red-100 h-12 text-center items-center justify-center space-x-4 '>
         
            <li>
              <Link to="/" >Home</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            

          </ul>
          <li className="flex flex-row items-center justify-end space-x-2 ">
  
  <FaUser className="text-4xl bg-gradient-to-r from-yellow-500 to-pink-500 "/>
  <p className='text-2xl '>{username}</p>
</li>
        </nav>

        <Routes>
          <Route path="/signup" element={<SignupForm  />} />
          <Route path="/login" element={<LoginForm  />} />
          <Route path="/" element={<NoteTaking/>}/>
         
        </Routes>
      </div>
    </Router>
    </NewNoteProvider>
  );
}

export default App;
