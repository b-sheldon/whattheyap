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
import TopBar from './TopBar';
import Quiz from './Quiz';

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {

  const { userId, sidebarCollapsed } = useStore();

  const containerStyle = {
    paddingRight: sidebarCollapsed ? 80 : 40,
    paddingLeft: sidebarCollapsed ? 0 : 40,
    paddingBottom: 50,
    paddingTop: 50,
    height: 'calc(100vh - 80px)',
    overflowY: 'scroll',
  };

  return (
    <BrowserRouter>
      <div className="flex flex-row">
        { userId && <Sidebar></Sidebar>}
        <div className="w-full flex flex-col justify-start">
          { userId && <TopBar></TopBar>}
          <div style={userId && containerStyle}>
            <Routes>
              <Route path="/" element={userId ? <Navigate to="/dashboard" /> : <Landing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={userId ? <Dashboard /> : <Navigate to="/"/>} />
              <Route path="/create" element={userId ? <Create /> :  <Navigate to="/"/>} />
              <Route path="/text-to-speech" element={userId ? <TextToSpeech /> : <Navigate to="/"/>}/>
              <Route path="/flashcardquiz" element={userId ? <FlashcardsLearn /> : <Navigate to="/"/>} />
              <Route path="/quiz" element={userId ? <Quiz /> : <Navigate to="/"/>} />
              <Route path="*" element={<FallBack />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;