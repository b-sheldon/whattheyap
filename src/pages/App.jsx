import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import useStore from '../store/zustand';
import 'tailwindcss/tailwind.css';

import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Create from './Create';
import TextToSpeech from './TextToSpeech';
import Sidebar from './Sidebar';

const Welcome = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to What The Yap?</h1>
      <button type="button" onClick={() => navigate('/text-to-speech')}>speech</button>
      <button type="button" onClick={() => navigate('/signin')}>Sign In</button>
      <button type="button" onClick={() => navigate('/signup')}>Sign Up</button>
      <button type="button" onClick={() => navigate('/create')}>Create</button>
    </div>
  );
};

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="flex flex-row">
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;