import axios from "axios";
import React, { useState, useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNewNote } from './App';
const NoteTaking = () => {
  const [showInput, setShowInput] = useState(false);
  const { newNote, setNewNote } = useNewNote();
  const [note, setNote] = useState("");
  const [fetchnote, setFetchNote] = useState([]);
  const [id, setId] = useState([]);
 

  const addNote = async () => {
    try {
    const response=  await axios.post("http://localhost:5000/note", { note, userid: id });
     
      
    setNewNote(newNote+1)
    } catch (error) {
      console.error("Note not created", error.message);
    }
  };
  
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
       
        setId(userdata?.data?.usertoken?._id);
        
      } catch (error) {
        console.error("Note not created", error.message);
      }
    };

    // Call the Authentication function
    Authentication();
  }, []); // Empty dependency array means this effect runs once on mount
  
  useEffect(() => {
    

    const ShowNote = async () => {
      try {
        const response=await axios.post("http://localhost:5000/noteget", {  userid: id });
       
        
        setFetchNote(response.data);
      } catch (error) {
        console.error("Note not created", error.message);
      }
    };
    ShowNote();
  }, [id,newNote]);
  const cancelAddNote = () => {
    // Reset the note state and hide the input box without adding a note
    setNote('');
    setShowInput(false);
  };
  const deleteNote = async (id) => {
    try {
      // Make a DELETE request to delete the note with the specified ID
     const response= await axios.delete(`http://localhost:5000/notes/${id}`);
     
      // Fetch updated notes after deletion
      setNewNote(newNote+1)
      
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center mt-8">Note Taking App</h1>
        {showInput ? (
          <div className="flex flex-col items-center bg-white p-4 rounded-lg border border-red-200 border-4 mt-4">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full h-80 mb-2 p-2 border border-transparent rounded text-center focus:outline-none"
              placeholder="Enter your note"
            />
             <div className="flex">
            <button
              onClick={addNote}
              className="bg-green-800 text-white px-4 py-2 rounded mr-2"
            >
              Add Note
            </button>
            <button
                onClick={cancelAddNote}
                className="bg-red-800 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              </div>
          </div>
        ) : (
          <CiCirclePlus
            onClick={() => setShowInput(true)}
            className="text-6xl text-red-200 cursor-pointer mt-4"
          />
        )}
      </div>
      <div className="flex flex-wrap mt-4">
        {fetchnote?.map((data) => (
          <div key={data._id} className="w-auto h-auto p-4 m-2 border-2 border-red-800 overflow-y-auto">
            <p className="mb-2 text-2xl">{data.note}</p>
            <button
  onClick={() => deleteNote(data?._id)}
  className="bg-red-800 text-white p-2 rounded mx-auto block"
>
  Delete
</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteTaking;
