import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useTTS from '../functions/tts';
import useStore from '../store/zustand';
import IconVolumeOn from '../icons/IconVolumeOn';
import IconVolumeOff from '../icons/IconVolumeOff';
import IconBackArrow from '../icons/IconBackArrow';
import { API_URL } from '../functions/config';

const timeSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Quiz = () => {
    const navigate = useNavigate();
    const { currentFlashcards, speechMode, setSpeechMode, currentTitle } = useStore();
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [currIndex, setCurrIndex] = useState(-1);
    const [feedback, setFeedback] = useState('');
    const [correct, setCorrect] = useState(false);
    const answerBox = useRef(null);
    const { transcript, listenerState, textToSpeech, sttFromMic, handleMute } = useTTS();

    // Function to fetch the quiz questions from the backend
    const fetchQuizQuestions = async () => {
      try {
        const response = await axios.post(`${API_URL}/gpt/generate-quiz`, {
          flashcards: currentFlashcards,
        });
        console.log(response);
        setQuizQuestions(response.data.quiz);
        setCurrIndex(0); // Start the quiz
      } catch (error) {
        console.error('Error generating quiz:', error);
      }
    };

    useEffect(() => {
      if (currentFlashcards.length > 0) {
        fetchQuizQuestions();
      }
    }, [currentFlashcards]);

    // Text-To-Speech function with condition check
    const condTTS = async (text) => {
      if (!speechMode) return;
      await textToSpeech(text);
    };

    const handleOptionClick = async (selectedOption) => {
      const isCorrect = selectedOption === quizQuestions[currIndex].a1;
      setCorrect(isCorrect);
      const feedbackMessage = isCorrect
        ? 'Correct!'
        : `Incorrect. The correct answer was: ${quizQuestions[currIndex].a1}.`;
      setFeedback(feedbackMessage);
      await condTTS(feedbackMessage);

      if (!speechMode) await timeSleep(3000);
      setFeedback('');
      setCurrIndex(currIndex + 1);
      if (currIndex + 1 < quizQuestions.length) {
        await condTTS(quizQuestions[currIndex + 1].q);
      } else {
        await condTTS('Quiz complete.');
      }
    };

    useEffect(() => {
      if (currIndex === 0) {
        condTTS(quizQuestions[currIndex].q);
      }
    }, [currIndex]);

    if (currentFlashcards.length === 0 || quizQuestions.length === 0) return <div>Loading...</div>;

    return (
      <div className="flex-grow flex flex-col items-center p-10 gap-6 text-xl">
        {/* Rest of your component code */}
        <div className="self-start font-bold text-2xl">{currentTitle}</div>
        {currIndex < quizQuestions.length && (
          <div className="w-2/3 flex flex-col items-center gap-6">
              <div 
                  className={`w-full bg-purplelight flex justify-center items-center border-2 border-purplelight rounded-xl focus:outline-purpledark shadow-md p-4 ${correct ? 'text-green-800' : 'text-red-800'}`}
              >
                  {feedback || quizQuestions[currIndex].q}
              </div>
              <div className='w-full flex justify-around'>
                <button
                    key={1}
                    onClick={() => handleOptionClick(quizQuestions[currIndex].a1)}
                    className="border-2 py-1 px-3 rounded-xl cursor-pointer border-green-800 text-green-800 shadow-md m-2"
                    disabled={speechMode}
                >
                    {quizQuestions[currIndex].a1}
                </button>
                <button
                    key={2}
                    onClick={() => handleOptionClick(quizQuestions[currIndex].a2)}
                    className="border-2 py-1 px-3 rounded-xl cursor-pointer border-green-800 text-green-800 shadow-md m-2"
                    disabled={speechMode}
                >
                    {quizQuestions[currIndex].a2}
                </button>
                <button
                    key={3}
                    onClick={() => handleOptionClick(quizQuestions[currIndex].a3)}
                    className="border-2 py-1 px-3 rounded-xl cursor-pointer border-green-800 text-green-800 shadow-md m-2"
                    disabled={speechMode}
                >
                    {quizQuestions[currIndex].a3}
                </button>
                <button
                    key={4}
                    onClick={() => handleOptionClick(quizQuestions[currIndex].a4)}
                    className="border-2 py-1 px-3 rounded-xl cursor-pointer border-green-800 text-green-800 shadow-md m-2"
                    disabled={speechMode}
                >
                    {quizQuestions[currIndex].a4}
                </button>
              </div>
          </div>
        )}
        {/* Rest of your component code */}
      </div>
    );
};

export default Quiz;
