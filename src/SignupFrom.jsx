import axios from "axios";
import React, { useState } from "react";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signup, setSignup] = useState("");
  const [token, setToken] = useState("");
  console.log(signup, "signup");
  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username,
        password,
      });
      setSignup(response?.data?.message);
      console.log(response, "response?.data?.message");

      alert("Signup successful! Please log in.");
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error("Signup error:", error.message);
      setSignup(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-gradient-to-r from-yellow-500 to-pink-500 h-screen flex justify-center items-center">
      <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl text-3xl bg-gradient-to-r from-yellow-500 to-pink-500 text-center mb-6 bg-clip-text text-transparent">Signup</h2>
        
        <label className="block text-sm font-medium text-gray-600">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </label>
        <label className="block text-sm font-medium text-gray-600">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </label>
        <button
          onClick={handleSignup}
          className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 mt-4"
        >
          Signup
        </button>
        {(() => {
          switch (signup) {
            case "User created successfully":
              return (
                <p className="text-green-500 text-center mt-4">
                  Registration Successful
                </p>
              );
            case "User with the same username already exists":
              return (
                <p className="text-red-500 text-center mt-4">
                  User with the same username already exists
                </p>
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

export default SignupForm;
