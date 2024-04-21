import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import useStore from '../store/zustand';
import 'tailwindcss/tailwind.css';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Create from './Create';
import TextToSpeech from './TextToSpeech';
import Sidebar from './Sidebar';
import FlashcardsLearn from './FlashcardsLearn';

const Welcome = () => {
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

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {

  const { userId } = useStore();

  return (
    <BrowserRouter>
      <div className="flex flex-row">
        { userId && <Sidebar></Sidebar>}
        <Routes>
          <Route path="/" element={userId ? <Navigate to="/dashboard" /> : <Welcome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={userId ? <Dashboard /> : <Navigate to="/"/>} />
          <Route path="/create" element={<Create />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
          <Route path="/flashcardquiz" element={<FlashcardsLearn />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;