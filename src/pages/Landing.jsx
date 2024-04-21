import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-purpledark text-white w-full">
      <h1 className="text-6xl font-bold mb-6">What The Yap?</h1>
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => navigate('/signin')}
          className="text-lg mx-4 px-6 py-2 rounded-lg shadow-md bg-blue-500 hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="text-lg mx-4 px-6 py-2 rounded-lg shadow-md bg-green-500 hover:bg-green-700 transition-colors"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Landing;