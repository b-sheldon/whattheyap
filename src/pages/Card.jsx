import React, {useState} from "react";

const Card = ({card}) => {
  const [editing, setEditing] = useState(false);
  const [question, setQuestion] = useState(card.q);
  const [answer, setAnswer] = useState(card.a);

  const toggleEdit = () => {
    setEditing(!editing);
    if (!editing) {
      // Update the card in the database
      
    }
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
          <i onClick={toggleEdit}className="absolute text-xl transition-all cursor-pointer top-2 right-2 fa-solid fa-check hover:scale-110 hover:text-purpledark"></i>
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
        <i onClick={toggleEdit}className="absolute text-xl transition-all cursor-pointer top-2 right-2 fa-solid fa-pencil hover:scale-110 hover:text-purpledark"></i>
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