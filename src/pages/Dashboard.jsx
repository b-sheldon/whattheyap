/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { fetchFlashcards, createFlashcardSet } from '../functions/flashcards';
import useStore from '../store/zustand';
// replace w/ redux later
const userId = 'TbNeMzejY8WlAenoFZruIt5yji62';

function Dashboard() {
  const { allFlashcards, setAllFlashcards } = useStore();
  const [title, setTitle] = useState('');
  const [cards, setCards] = useState([{ q: '', a: '' }]);

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
      <h1 className="text-lg font-bold mb-4">Your Flashcards</h1>
      <button onClick={() => console.log(allFlashcards)}>CUM</button>

      {/* Input for the title of the new flashcard set */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title of the flashcard set"
        className="mb-4 p-2 border rounded"
      />

      {/* Inputs for each card */}
      {cards.map((card, index) => (
        <div key={index} className="mb-2">
          <input
            type="text"
            value={card.q}
            onChange={(e) => handleCardChange(index, 'q', e.target.value)}
            placeholder="Front (Question)"
            className="mr-2 p-1 border rounded"
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
      <button type="button" onClick={addCard} className="mt-2 mb-4 p-2 bg-green-300 rounded text-white">
        Add Another Card
      </button>

      {/* Button to submit the whole set */}
      <button type="button" onClick={handleSubmit} className="p-2 bg-blue-500 rounded text-white">
        Submit Flashcard Set
      </button>

      {/* Existing flashcards */}
      {allFlashcards && allFlashcards.length > 0 ? (
        <ul>
          {allFlashcards.map((card) => (
            <li key={card.id} className="mt-4 p-2 bg-blue-200 rounded">
              <p><strong>Title:</strong> {card.title}</p>
              <ul>
                {card.cards.map((subcard, idx) => (
                  <li key={idx}>
                    <strong>Front:</strong> {subcard.q}, <strong>Back:</strong> {subcard.a}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No flashcards found.</p>
      )}
    </div>
  );
}

export default Dashboard;
