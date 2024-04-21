import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchFlashcards, createFlashcardSet } from '../functions/flashcards';
import useStore from '../store/zustand';

const Sidebar = (props) => {
  const { currentID, setCurrentID, userId, allFlashcards, setAllFlashcards, sidebarCollapsed, setSidebarCollapsed, currentFlashcards, setCurrentFlashcards, currentTitle, setCurrentTitle } = useStore();
  const location = useLocation();
  
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
      <div className="flex flex-col flex-grow h-screen gap-4 overflow-hidden shadow bg-purplelight">
        <button onClick={toggleSidebar} className="self-start w-12 p-2 mt-4 ml-4 text-xl font-bold text-white transition-transform rounded bg-purpledark hover:scale-110">
          <i className="fa-solid fa-x"></i>
        </button>
        <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'}`} style={{ transition: 'width 0.3s' }}>
          <div className='flex items-center justify-between w-full p-4 text-2xl'>
            <div className="font-bold">Your Study Sets</div>
            {(location.pathname !== "/create") && <button onClick={() => navigate('/create')} className="relative flex items-center justify-center text-xl group">
              <i className="text-2xl fa-regular fa-square-plus"/>
              <div className='absolute bg-opacity-60 text-sm bg-purpledark opacity-0 p-2 right-0 -bottom-[160%] rounded-lg shadow translate-x-4 group-hover:translate-x-2 group-hover:opacity-100 transition text-nowrap group-hover:visible invisible'>create new</div>
            </button>}
          </div>
          {allFlashcards && allFlashcards.length > 0 ? (
            <ul className='overflow-y-scroll text-lg h-4/5'>
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