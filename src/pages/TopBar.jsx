import React from 'react';
import useStore from '../store/zustand';

function TopBar() {
  const logout = useStore((state) => state.logout); // Assuming logout is a function in your Zustand store
  return (
      <div className="bg-purpledark h-20 text-black flex justify-between items-center p-4">
        <h1 className="text-4xl font-bold">WhatTheYap</h1>
        <button
          onClick={() => logout()}
          className="px-4 py-2 rounded-3xl border-black border-2 hover:bg-purplelight rounded transition duration-300"
        >
          signout
        </button>
      </div>
  );
}

export default TopBar;
