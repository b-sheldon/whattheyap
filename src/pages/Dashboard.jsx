/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { createFlashcardSet } from '../functions/flashcards';
import refreshFlashcards from './Sidebar.jsx';
import useStore from '../store/zustand';
import Card from './Card';
import TopBar from './TopBar.jsx';

function Dashboard() {
  const [title, setTitle] = useState('');
  const [cards, setCards] = useState([{ q: '', a: '' }]);
  const { currentFlashcards, setCurrentFlashcards } = useStore();
  const { currentTitle, setCurrentTitle } = useStore();
  const { userId } = useStore();
  const navigate = useNavigate();

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

  return (
    <div className="w-full">
      
      <TopBar></TopBar>

      <div className="flex flex-col flex-grow p-4">
        <h1 className="mb-4 text-lg font-bold">{currentTitle}</h1>
        <button onClick={() => navigate('/flashcardquiz')}>CUM</button>

      {currentFlashcards.map((card) => (
        <Card key={card.q} card={card}/>
      ))}

        {/* Inputs for each card */}
        {cards.map((card, index) => (
          <div key={index} className="mb-2">
            <input
              type="text"
              value={card.q}
              onChange={(e) => handleCardChange(index, 'q', e.target.value)}
              placeholder="Front (Question)"
              className="p-1 mr-2 border rounded"
            />
            <input
              type="text"
              value={card.a}
              onChange={(e) => handleCardChange(index, 'a', e.target.value)}
              placeholder="Back (Answer)"
              className="p-1 border rounded"
            />
          </div>
        ))}

        {/* Button to add more cards */}
        <button type="button" onClick={addCard} className="p-2 mt-2 mb-4 text-white bg-green-300 rounded">
          Add Another Card
        </button>

        {/* Button to submit the whole set */}
        <button type="button" onClick={handleSubmit} className="p-2 text-white bg-blue-500 rounded">
          Submit Flashcard Set
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
