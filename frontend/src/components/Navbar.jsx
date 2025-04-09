import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user }) {
  console.log("Navbar user:", user)
  return (
    <>
      <div className="bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/" className="flex items-center mr-5">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/600px-Pinterest-logo.png"
              alt="Pinterest"
              className="h-6 md:mr-2"
            />
            <span className="text-red-600 text-xl font-bold">Pinterest</span>
          </Link>
          <div className="flex items-center space-x-4 w-[200px]">
            <Link to="/" className="text-gray-700 hover:text-gray-900">Home</Link>
            <Link to="/" className="text-gray-700 hover:text-gray-900">Create</Link>

            {user?.name ? (
              <Link to="/" className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xl text-gray-700">
                {user.name.slice(0, 1)}
              </Link>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
