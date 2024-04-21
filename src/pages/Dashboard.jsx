/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { createFlashcardSet } from '../functions/flashcards';
import refreshFlashcards from './Sidebar.jsx';
import useStore from '../store/zustand';
import Card from './Card';

function Dashboard() {
  const [title, setTitle] = useState('');
  const [cards, setCards] = useState([{ q: '', a: '' }]);
  const { allFlashcards, currentFlashcards, setCurrentFlashcards } = useStore();
  const { currentTitle, setCurrentTitle } = useStore();
  const { userId } = useStore();
  const { sidebarCollapsed } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (allFlashcards.length === 0) {
      navigate('/create');
    }
  }, [currentFlashcards.length, navigate]);

  const handleCardChange = (index, side, value) => {
    const newCards = [...cards];
    newCards[index][side] = value;
    setCards(newCards);
  };

  const addCard = () => {
    setCards([...cards, { q: '', a: '' }]);
  };

  const handleSubmit = async () => {
    try {
      await createFlashcardSet(title, cards, userId);
      // After successful creation, reset form and refresh list of flashcards
      setTitle('');
      setCards([{ q: '', a: '' }]);
      refreshFlashcards(); // Fetch the latest list of flashcards to include the new one
    } catch (error) {
      console.error('Error creating flashcard:', error);
    }
  };

  const containerStyle = {
    paddingRight: sidebarCollapsed ? 80 : 40,
    paddingLeft: sidebarCollapsed ? 0 : 40,
    paddingBottom: 50,
    paddingTop: 50,
    height: 'calc(100vh - 80px)',
    overflowY: 'scroll',
  };

  return (
    <div className="flex flex-col flex-grow p-2">
        
      <div className="w-full items-center flex flex-row flex-grow justify-between p-2 mb-4">
        <h1 className="mb-4 text-4xl font-bold">{currentTitle}</h1>

        <button className="px-4 py-2 rounded-3xl border-black border-2 hover:bg-purplelight rounded transition duration-300" onClick={() => navigate('/flashcardquiz')}>
          <i class="fa-regular fa-hand mr-2"></i>
          Take Quiz
        </button>

      </div>

        {currentFlashcards.map((card) => (
          <Card key={card.q} card={card}/>
        ))}

        {cards.map((card, index) => (
          <div key={index} className="mb-4 flex">
            <input
              type="text"
              value={card.q}
              onChange={(e) => handleCardChange(index, 'q', e.target.value)}
              placeholder="Front (Question)"
              className="p-4 w-full text-lg border-2 border-gray-300 rounded-lg mb-2"
            />
            <input
              type="text"
              value={card.a}
              onChange={(e) => handleCardChange(index, 'a', e.target.value)}
              placeholder="Back (Answer)"
              className="p-4 w-full text-lg border-2 border-gray-300 rounded-lg mb-2"
            />
          </div>
        ))}

        {/* Button to add more cards */}
        <button type="button" onClick={addCard} className="p-2 mt-2 mb-4 text-white bg-green-300 rounded delay-500 duration-500 transform hover:bg-green-700 transition ease-linear">
          Add Another Card
        </button>

        {/* Button to submit the whole set */}
        <button type="button" onClick={handleSubmit} className="p-2 text-white bg-blue-500 rounded delay-500 duration-500 transform hover:bg-blue-700 transition ease-linear">
          Submit Flashcard Set
        </button>
        
      </div>
  );
}

export default Dashboard;
