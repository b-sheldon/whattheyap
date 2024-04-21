import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import useStore from '../store/zustand';
import 'tailwindcss/tailwind.css';

import Landing from './Landing';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Create from './Create';
import TextToSpeech from './TextToSpeech';
import Sidebar from './Sidebar';
import FlashcardsLearn from './FlashcardsLearn';

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
          <Route path="/" element={userId ? <Navigate to="/dashboard" /> : <Landing />} />
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