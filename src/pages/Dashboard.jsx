/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { fetchFlashcards, createFlashcardSet } from '../functions/flashcards';
import refreshFlashcards from './Sidebar.jsx';
import useStore from '../store/zustand';
// replace w/ redux later
const userId = 'TbNeMzejY8WlAenoFZruIt5yji62';

function Dashboard() {
  const [title, setTitle] = useState('');
  const [cards, setCards] = useState([{ q: '', a: '' }]);
  const { currentFlashcards, setCurrentFlashcards } = useStore();
  const { currentTitle, setCurrentTitle } = useStore();
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
    <div className="p-4">
      <h1 className="mb-4 text-lg font-bold">{currentTitle}</h1>
      <button onClick={() => navigate('/flashcardquiz')}>CUM</button>

      {/* Input for the title of the new flashcard set */}
      {/* <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title of the flashcard set"
        className="p-2 mb-4 border rounded"
      /> */}
      {currentFlashcards.map((card) => (
        <div key={card.q} className="flex flex-row">
          <div className='p-2 m-4 bg-blue-200 rounded'>{card.q}</div>
          <div className='p-2 m-4 bg-blue-200 rounded'>{card.a}</div>
        </div>
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
  );
}

export default Dashboard;
