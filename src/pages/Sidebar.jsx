import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFlashcards, createFlashcardSet } from '../functions/flashcards';
import useStore from '../store/zustand';

const userId = 'TbNeMzejY8WlAenoFZruIt5yji62';

const Sidebar = (props) => {
  const { allFlashcards, setAllFlashcards } = useStore();
  const { sidebarCollapsed, setSidebarCollapsed } = useStore();
  const { currentFlashcards, setCurrentFlashcards } = useStore();
  const { currentTitle, setCurrentTitle } = useStore();
  const navigate = useNavigate(); // Hook for navigation

  const refreshFlashcards = () => {
    fetchFlashcards()
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
  
  const selectFlashcardSet = (e) => {
    setCurrentTitle(e.target.innerText);
    const selectedSet = allFlashcards.find((card) => card.title === e.target.innerText);
    setCurrentFlashcards(selectedSet.cards);
    navigate('/dashboard');
  }
  
  return (
    <div className="flex flex-col gap-4 m-4">
      <button onClick={toggleSidebar} className="self-start w-12 p-2 mb-2 text-xl font-bold text-white transition-transform bg-blue-500 rounded hover:scale-110">
        {sidebarCollapsed ? <i className="fa-solid fa-bars"></i> : <i className="fa-solid fa-x"></i>}
      </button>
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'}`} style={{ transition: 'width 0.3s' }}>
        <h1 className="mb-4 text-lg font-bold">Your Flashcard Sets</h1>
        {allFlashcards && allFlashcards.length > 0 ? (
          <ul>
            {allFlashcards.map((card) => (
              <li key={card.id} onClick={selectFlashcardSet} className="p-2 mt-4 bg-blue-200 rounded">
                <p>{card.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No flashcards found.</p>
        )}
      </div>
    </div>
  );
}

export default Sidebar;