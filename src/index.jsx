import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './style.scss';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Create from './pages/Create';
import TextToSpeech from './pages/TextToSpeech';

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
      <div>
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

const root = createRoot(document.getElementById('main'));
root.render(<App />);
