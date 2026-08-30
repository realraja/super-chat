// src/LoginForm.js

import React, { useState } from "react";
// import AnimatedBackground1 from '../components/backgrounds/AnimatedBackground1';
import AnimatedVanta from "../components/backgrounds/AnimatedVanta";
import { useNavigate } from "react-router-dom";
import Title from "../components/shared/Title";
import axios from "axios";
import { config, server } from "../constants/config";
import { useDispatch } from "react-redux";
import { login } from "../redux/slicer/auth";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();




  const handleLogin = async (e)=>{
    e.preventDefault();
    
    
    
    try {
      setIsLoading(true);
      const {data} = await axios.post(`${server}/user/login`,{username,password},config)
      setIsLoading(false);

      // console.log(data);
      dispatch(login(data.user));

      toast.success(data.message);

    } catch (error) {
      console.log(error);
      // console.log(error,error?.response?.data?.message || 'Something went wrong!');
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    }finally{
    }

  }
  return (<>
  <Title title="Login" description="Chat app login" />
    <div className="text-white">
      <AnimatedVanta />
      {/* <AnimatedBackground1 /> */}
      <div className="flex items-center justify-center h-[calc(100dvh)]">
        <form onSubmit={handleLogin} className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg text-center text-white">
          <h2 className="text-3xl mb-6">Login</h2>
          <div className="mb-4">
            <label className="block text-left mb-2" htmlFor="username">
              Username
            </label>
            <input
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
              type="text"
              id="username"
              name="username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-left mb-2" htmlFor="password">
              Password
            </label>
            <input
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <button
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-900 text-white rounded transition"
            type="submit"
            disabled={isLoading || !username || !password}
          >
            {isLoading?<BeatLoader /> :'Login'}
          </button>
          <div className="text-center mt-4">
            <p>OR</p>
          </div>
          <div className="text-center mt-4">
            <p onClick={()=> navigate('/register')} className="text-purple-600 cursor-pointer">
              REGISTER INSTEAD
            </p>
          </div>
        </form>
        
      </div>
    </div></>
  );
};

export default Login;
