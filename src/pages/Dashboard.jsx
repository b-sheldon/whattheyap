/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { createFlashcardSet } from '../functions/flashcards';
import refreshFlashcards from './Sidebar.jsx';
import useStore from '../store/zustand';
import Card from './Card';
import TopBar from './TopBar.jsx';
import { updateFlashcardSet } from '../functions/flashcards';

function Dashboard() {
  const { allFlashcards, setAllFlashcards } = useStore();
  const { currentFlashcards, setCurrentFlashcards } = useStore();
  const { currentTitle, setCurrentTitle } = useStore();
  const { currentID } = useStore();
  const { userId } = useStore();
  const { sidebarCollapsed } = useStore();
  const navigate = useNavigate();
  const [nextQuestion, setNextQuestion] = useState('');
  const [nextAnswer, setNextAnswer] = useState('');

  useEffect(() => {
    if (currentFlashcards.length === 0) {
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

  const handleSubmit = async () => {
    try {
      await createFlashcardSet(title, cards, userId);
      // After successful creation, reset form and refresh list of flashcards
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
    <div className="w-full">
      
      <TopBar></TopBar>

      <div style={containerStyle} className="flex flex-col flex-grow p-2">
        
      <div className="flex flex-row items-center justify-between flex-grow w-full p-2 mb-4">
        <h1 className="mb-4 text-4xl font-bold">{currentTitle}</h1>

        <button className="px-4 py-2 transition duration-300 border-2 border-black rounded rounded-3xl hover:bg-purplelight" onClick={() => navigate('/flashcardquiz')}>
          <i className="mr-2 fa-regular fa-hand"></i>
          Take Quiz
        </button>

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
    </div>
  );
}

export default Dashboard;
