import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-t from-color4 via-color3 to-color2 text-white w-full">
      <h1 className="text-6xl font-bold mb-6 tracking-widest">🎙️What The Yap?</h1>
      <p className="text-xl animate-pulse">A voice-assisted study tool!</p>
      <div className="space-y-4 mt-4">
        <button
          type="button"
          onClick={() => navigate('/signin')}
          className="text-lg mx-4 px-6 py-2 rounded-lg shadow-lg bg-blue-400 hover:bg-blue-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="text-lg mx-4 px-6 py-2 rounded-lg shadow-lg bg-green-400 hover:bg-green-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Landing;
