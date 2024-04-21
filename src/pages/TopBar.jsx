import React from 'react';
import useStore from '../store/zustand';
import { useNavigate } from 'react-router-dom';

function TopBar() {
  const logout = useStore((state) => state.logout); // Assuming logout is a function in your Zustand store
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
      <div className="bg-purpledark h-20 text-black flex justify-between items-center p-4">
        <h1 className="text-4xl">WhatTheYap?</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-xl shadow bg-purplelight  hover:bg-white transition duration-300"
        >
          sign out
        </button>
      </div>
  );
}

export default TopBar;
