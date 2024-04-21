import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFlashcards, createFlashcardSet } from '../functions/flashcards';
import useStore from '../store/zustand';

const Sidebar = (props) => {
  const { allFlashcards, setAllFlashcards } = useStore();
  const { sidebarCollapsed, setSidebarCollapsed } = useStore();
  const { currentFlashcards, setCurrentFlashcards } = useStore();
  const { currentTitle, setCurrentTitle } = useStore();
  const { userId } = useStore();
  const { currentID, setCurrentID } = useStore();
  
  const navigate = useNavigate(); // Hook for navigation

  const refreshFlashcards = () => {
    fetchFlashcards(userId)
      .then((data) => {
        console.log('Fetched flashcards:', data);
        setAllFlashcards(data);
      })
      .catch((error) => console.error('Error fetching flashcards:', error));
  };
  useEffect(() => {
    refreshFlashcards();
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  const selectFlashcardSet = (card) => {
    setCurrentTitle(card.title);
    setCurrentFlashcards(card.cards);
    setCurrentID(card.id);
    navigate('/dashboard');
  }
  
  return (
    <div>
      {sidebarCollapsed ?
      <div className="flex flex-col h-20 p-4 bg-purpledark">
        <button onClick={toggleSidebar} className="self-start w-12 p-2 text-xl font-bold text-white transition-transform rounded hover:scale-110">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
      : 
      <div className="flex flex-col h-screen gap-4 shadow bg-purplelight">
        <button onClick={toggleSidebar} className="self-start w-12 p-2 mt-4 ml-4 text-xl font-bold text-white transition-transform rounded bg-purpledark hover:scale-110">
          <i className="fa-solid fa-x"></i>
        </button>
        <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'}`} style={{ transition: 'width 0.3s' }}>
          <h1 className="mb-4 ml-6 text-lg text-2xl font-bold">Your Study Sets</h1>
          {allFlashcards && allFlashcards.length > 0 ? (
            <ul className='text-lg'>
              {allFlashcards.map((card) => (
                <li key={card.id} onClick={() => selectFlashcardSet(card)} className="p-6 transition-all bg-white border-b-2 shadow cursor-pointer border-purpledark hover:bg-gray-200">
                  <p>{card.title}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className='pl-6'>No flashcards found.</p>
          )}
        </div>
      </div>
    }
    </div>
  );
}

export default Sidebar;