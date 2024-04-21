/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { createFlashcardSet } from '../functions/flashcards';
import refreshFlashcards from './Sidebar.jsx';
import useStore from '../store/zustand';
import Card from './Card';
import { updateFlashcardSet, deleteFlashcardSet } from '../functions/flashcards';
import IconFlashcards from '../icons/IconFlashcards';

function Dashboard() {
  const { userId, sidebarCollapsed, currentID, setCurrentID, currentTitle, setCurrentTitle, currentFlashcards, setCurrentFlashcards, allFlashcards, setAllFlashcards } = useStore();
  const navigate = useNavigate();
  const [nextQuestion, setNextQuestion] = useState('');
  const [nextAnswer, setNextAnswer] = useState('');

  useEffect(() => {
    if (allFlashcards.length === 0) {
      navigate('/create');
    }
  }, [currentFlashcards.length, navigate]);

  const handleQuestionChange = (value) => {
    setNextQuestion(value);
  };
  const handleAnswerChange = (value) => {
    setNextAnswer(value);
  };

  const addCard = () => {
    const newFlashcards = [...currentFlashcards, { q: nextQuestion, a: nextAnswer }];
    setCurrentFlashcards(newFlashcards);
    setNextQuestion('');
    setNextAnswer('');
    // Update the card in allFlashcards
    const updatedFlashcards = allFlashcards.map((set) => {
      if (set.id === currentID) {
        return { id: set.id, title: currentTitle, cards: newFlashcards };
      }
      return set;
    });
    setAllFlashcards(updatedFlashcards);
    updateFlashcardSet(currentID, currentTitle, newFlashcards);
  };

  const deleteSet = () => {
    const setToDelete = allFlashcards.find((set) => set.title === currentTitle);
    const updatedFlashcards = allFlashcards.filter((set) => set.title !== currentTitle);
    setAllFlashcards(updatedFlashcards);
    deleteFlashcardSet(setToDelete.id);
    setCurrentFlashcards([]);
    setCurrentTitle('');
    setCurrentID('');
    navigate('/create');
  };

  return (
    <div className="flex flex-col flex-grow p-2">
        
      <div className="flex flex-row items-center justify-between flex-grow w-full p-2 mb-4">
        <h1 className="mb-4 text-4xl font-bold">{currentTitle}</h1>

        <div className='flex justify-between'>
          <button className="flex items-center px-4 py-2 mr-2 transition duration-300 border-2 border-black rounded rounded-3xl hover:bg-purplelight" onClick={deleteSet}>
            <i className="mr-2 fa-solid fa-trash"></i>
            <p>Delete Set</p>
          </button>

          <button className="flex items-center px-4 py-2 mr-2 transition duration-300 border-2 border-black rounded rounded-3xl hover:bg-purplelight" onClick={() => navigate('/flashcardquiz')}>
            <IconFlashcards className="w-5 mr-2"/>
            <p>Study Flashcards</p>
          </button>

          <button className="flex items-center px-4 py-2 transition duration-300 border-2 border-black rounded rounded-3xl hover:bg-purplelight" onClick={() => navigate('/quiz')}>
            <i className="mr-2 fa-regular fa-hand"></i>
            <p>Take Quiz</p>
          </button>
        </div>
      </div>

        {currentFlashcards.map((card) => (
          <Card key={card.q} card={card}/>
        ))}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={nextQuestion}
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Front (Question)"
              className="w-full p-4 mb-2 text-lg border-2 border-gray-300 rounded-lg focus:outline-purpledark"
            />
            <input
              type="text"
              value={nextAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Back (Answer)"
              className="w-full p-4 mb-2 text-lg border-2 border-gray-300 rounded-lg focus:outline-purpledark"
            />
          </div>

        {/* Button to add more cards */}
          <i onClick={addCard} className="self-center p-2 mb-4 text-5xl transition-all rounded cursor-pointer fa-solid fa-circle-plus text-purpledark hover:scale-110"></i>
      </div>
  );
}

export default Dashboard;
