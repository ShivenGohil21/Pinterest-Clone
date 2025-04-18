import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { UserData } from '../context/UserContext';
import { toast } from 'react-hot-toast';
import { LoadingAnimation } from '../components/Loading';
const Register = () => {
  const [email, setEmail] =  useState("");
      const [password, setPassword] =  useState("");
      const [name, setName] = useState("");
  
      const{ registerUser, btnLoading } = UserData();
      const navigate = useNavigate();
  
      const submitHandler = (e) => {
          e.preventDefault();
         registerUser(name,email,password,navigate);
      }
    return (
      <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/600px-Pinterest-logo.png" 
              alt="Pinterest" 
              className="h-12"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-6">Register to Pintrest </h2>
          <form onSubmit={submitHandler}
          className="space-y-4">
            <div>
              <label htmlFor="name" 
              className="block text-sm font-medium text-gray-700 text-left mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="common-input "
                value={name} 
                onChange={(e)=> setName(e.target.value)}
                required
              />
            </div>

            <div>
            <label htmlFor="email" 
            className="block text-sm font-medium text-gray-700 text-left mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="common-input "
              value={email} 
              onChange={(e)=> setEmail(e.target.value)}
              required
            />
          </div>
  
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className=" common-input"
                value={password} 
                onChange={e=> setPassword(e.target.value)}
                required
              />
            </div>
  
            <button
              type="submit"
              className=" common-btn w-full" disabled={btnLoading}
            >
              {btnLoading ?  <LoadingAnimation /> : "Register"}
            </button>
          </form>
  
          <div className='mt-6 text-center'>
              <div className='relative mb-4'>
                  <div className='absolute inset-0 flex items-center'>
                      <div className='w-full border-t border-gray-300'> </div>
                  </div>
                  <div className='relative flex justify-center text-sm'>
                      <span className='bg-white px-2 to-gray-50'>OR</span>
                  </div>
              </div>
              <div className="mt-4 text-center text-sm">
                  <span>
                      Already have an account?
                      <Link
                       to="/login"
                       className="font-medium text-pinterest hover:underline">Login</Link>
                  </span>
              </div>
          </div>
        </div>
      </div>
    </div>
    )
};

export default Register
