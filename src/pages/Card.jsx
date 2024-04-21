import React, {useState} from "react";
import { fetchFlashcards, updateFlashcardSet } from "../functions/flashcards";
import useStore from "../store/zustand";

const Card = ({card}) => {
  const [editing, setEditing] = useState(false);
  const [question, setQuestion] = useState(card.q);
  const [answer, setAnswer] = useState(card.a);
  const { currentID } = useStore();
  const { currentFlashcards, setCurrentFlashcards } = useStore();
  const { currentTitle, setCurrentTitle } = useStore();
  const { allFlashcards, setAllFlashcards } = useStore();

  const toggleEdit = () => {
    if (editing) {
      // Update the card in currentFlashcards
      const newFlashcards = currentFlashcards.map((c) => {
        if (c === card) {
          return { q: question, a: answer };
        }
        return c;
      });
      setCurrentFlashcards(newFlashcards);
      // Update the card in allFlashcards
      const updatedFlashcards = allFlashcards.map((set) => {
        if (set.id === currentID) {
          return { id: set.id, title: currentTitle, cards: newFlashcards };
        }
        return set;
      });
      setAllFlashcards(updatedFlashcards);
      updateFlashcardSet(currentID, currentTitle, newFlashcards);
      fetchFlashcards();
    }
    setEditing(!editing);
  }
  const deleteCard = () => {
    const newFlashcards = currentFlashcards.filter((c) => c.q !== question);
    setCurrentFlashcards(newFlashcards);
    const updatedFlashcards = allFlashcards.map((set) => {
      if (set.id === currentID) {
        return { id: set.id, title: currentTitle, cards: newFlashcards };
      }
      return set;
    });
    setAllFlashcards(updatedFlashcards);
    updateFlashcardSet(currentID, currentTitle, newFlashcards);
    fetchFlashcards();
  }
  
  const renderCard = () => {
    if (editing) {
      return (
        <div className="relative flex flex-row gap-4 p-4 mb-4 rounded bg-purplelight">
          <div className='border-r-2 border-gray-300 basis-full'>
            <p className='text-lg font-bold'>TERM</p>
            <textarea value={question} onChange={(e) => setQuestion(e.target.value)}className='w-11/12 p-2 m-2 text-xl bg-gray-100 resize-none border-box rounded-xl focus-outline-purpledark'></textarea>
          </div>
          <div className='basis-full'>
            <p className='text-lg font-bold'>DEFINITION</p>
            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} className='w-11/12 p-2 m-2 text-xl bg-gray-100 resize-none border-box rounded-xl focus:outline-purpledark'></textarea>
          </div>
          <i onClick={() => toggleEdit(card)}className="absolute text-xl transition-all cursor-pointer top-2 right-2 fa-solid fa-check hover:scale-110 hover:text-purpledark"></i>
        </div>
      );
    }
    return (
      <div className="relative flex flex-row gap-4 p-4 mb-4 rounded bg-purplelight">
        <div className='border-r-2 border-gray-300 basis-full'>
          <p className='text-lg font-bold'>TERM</p>
          <div lang="en" className='p-4 text-xl hyphens-auto'>{question}</div>
        </div>
        <div className='basis-full'>
          <p className='text-lg font-bold'>DEFINITION</p>
          <div lang="en" className='p-4 text-xl hyphens-auto'>{answer}</div>
        </div>
        <i onClick={deleteCard}className="absolute text-xl transition-all cursor-pointer top-4 right-12 fa-solid fa-trash hover:scale-110 hover:text-purpledark"></i>
        <i onClick={toggleEdit}className="absolute text-xl transition-all cursor-pointer top-4 right-4 fa-solid fa-pencil hover:scale-110 hover:text-purpledark"></i>
      </div>
    );
  }
  
  return (
    <div>
      {renderCard()}
    </div>
  );
}

export default Card;