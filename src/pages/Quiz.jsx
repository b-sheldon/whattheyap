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

const textToSpeak = (question) => {
  let text = question.q + '. ';
  text += 'Your options are: ';
  text += question.a1 + ', ';
  text += question.a2 + ', ';
  text += question.a3 + ', ';
  text += question.a4 + '. ';
  return text;
}

const Quiz = () => {
    const navigate = useNavigate();
    const { speechMode, setSpeechMode, currentTitle, currentFlashcards } = useStore();
    const { quizQuestions, setQuizQuestions } = useStore();
    const [currIndex, setCurrIndex] = useState(-1);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const { transcript, listenerState, textToSpeech, sttFromMic, handleMute } = useTTS();
    const [correct, setCorrect] = useState(false);

    const condTTS = async (text) => {
        if (!speechMode) return;
        await textToSpeech(text);
    };

    const startQuiz = () => {
        setCurrIndex(0);
    }

    const condSTT = () => {
        if (!speechMode) return;
        sttFromMic();
    };

    useEffect(() => {
      console.log('sending flashcards to backend:');
      console.log(currentFlashcards);
      axios.post(`${API_URL}/gpt/generate-quiz`, {
        flashcards: currentFlashcards,
      }).then((response) => {
        const { quiz } = response.data;
        const newQuiz = quiz.map((q) => {
          const newQ = {q: q.q, a: q.a1};
          const answers = ["a1", "a2", "a3", "a4"];
          const randomAnswers = ["a1", "a2", "a3", "a4"].sort(() => Math.random() - 0.5);
          for (let i = 0; i < 4; i++) {
            newQ[answers[i]] = q[randomAnswers[i]];
          }
          return newQ;
        });

        setQuizQuestions(newQuiz);
        // console.log(response.data.quiz);
        startQuiz();
      });
    }, []);




    useEffect(() => {
        if (listenerState === 'stopped' && speechMode) {
            if (transcript) {
                setAnswer(transcript);
                console.log(currIndex);
                axios.post(`${API_URL}/gpt/validate-answer`, {
                    response: transcript,
                    answer: quizQuestions[currIndex].a,
                }).then((validateResponse) => {
                    console.dir(validateResponse.data);
                    setCorrect(validateResponse.data === 1);
                    setCurrIndex(currIndex + 1);
                });
            } else {
                if (currIndex >= 0 && currIndex < quizQuestions.length) {
                    textToSpeech(quizQuestions[currIndex].q).then(() => {
                        sttFromMic();
                    });
                }
            }
        }
    }, [listenerState]);


    const handleNextQuesion = async () => {
        if (currIndex === 0) {
          console.log(quizQuestions);
            await condTTS(textToSpeak(quizQuestions[currIndex]));
            condSTT();
        }
        else if (currIndex < quizQuestions.length && currIndex > 0) {
            const feedback = correct ? 'Correct!' : `Incorrect. The correct answer was: ${quizQuestions[currIndex - 1].a}.`;
            setFeedback(feedback);
            await condTTS(feedback);
            setAnswer('');
            if (!speechMode) await timeSleep(3000);
            setFeedback('');
            await condTTS(textToSpeak(quizQuestions[currIndex]));
            condSTT();
        } else if (currIndex >= quizQuestions.length) {
            const feedback = correct ? 'Correct!' : `Incorrect. The correct answer was: ${quizQuestions[currIndex - 1].a}.`
            setFeedback(feedback);
            await condTTS(feedback);
            if (!speechMode) await timeSleep(3000);
            setFeedback('');
            await condTTS('Quiz complete.');
        }
    };

    const questionBoxText = () => {
        if (!feedback) {
            if (currIndex < quizQuestions.length) return quizQuestions[currIndex].q;
            return 'Quiz Complete.';
        }
        return feedback;
    }

    const questionBoxColor = () => {
        if (!feedback) return 'text-black';
        if (correct) return 'text-green-800';
        return 'text-red-800';
    }

    const toggleSpeechMode = async () => {
        const temp = speechMode;
        setSpeechMode(!speechMode);
        if (temp) {
            console.log('ending speech mode');
            // handleMute();
            return;
        }
        if (currIndex >= quizQuestions.length) return;
        console.log('starting speech mode');
        await textToSpeech(textToSpeak(quizQuestions[currIndex].q));
        sttFromMic();
    }

    const checkAnswer = (answer) => {
        axios.post(`${API_URL}/gpt/validate-answer`, {
            response: answer,
            answer: quizQuestions[currIndex].a,
        }).then((validateResponse) => {
            console.dir(validateResponse.data);
            setCorrect(validateResponse.data === 1);
            setCurrIndex(currIndex + 1);
        });
    };


    useEffect(() => {
        handleNextQuesion();
    }, [currIndex]);


    if (quizQuestions.length === 0 || currIndex < 0) return <div>Generating quiz...</div>;

    return (
    <div className="flex-grow flex flex-col items-center gap-6 text-xl">
        <div className="w-full flex justify-between items-center gap-4 border-b-2 py-6">
            <button onClick={() => navigate("/dashboard")}><IconBackArrow className="cursor-pointer w-10 h-10 hover:scale-110 hover:-rotate-6 transition" /></button>
            <div className="flex gap-2">
                <div className='flex flex-col justify-center'>
                    <div className='leading-none'>audio</div>
                    <div className='leading-none'>mode</div>
                </div>
                <button className=" relative w-10 h-10" onClick={toggleSpeechMode}>
                    <IconVolumeOn className="absolute top-0 left-0 transition-all text-green-800" style={{ opacity: speechMode ? 1 : 0 }} />
                    <IconVolumeOff className="absolute top-0 left-0 transition-all text-red-800" style={{ opacity: !speechMode ? 1 : 0 }} />
                </button>
            </div>
        </div>
        <div className="self-start font-bold text-2xl">{currentTitle}</div>
        <div className="w-2/3 flex flex-col items-center gap-6">
            <div 
                className={`w-full bg-purplelight flex justify-center items-center border-2 border-purplelight rounded-xl focus:outline-purpledark shadow-md p-4 ${questionBoxColor()}`}
            >
                {questionBoxText()}
            </div>
            {(currIndex < quizQuestions.length) && <div className='flex w-full gap-2'>
              {["a1", "a2"].map((a) => (
                <button
                  className={` p-4 flex flex-grow justify-center items-center bg-purplelight text-black border-2 border-purplelight rounded-xl focus:outline-purpledark shadow-md transition duration-300 hover:bg-purpledark hover:text-white ${speechMode ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                  disabled={speechMode}
                  onClick={() => checkAnswer(quizQuestions[currIndex][a])}
                  key={a}
                >
                  {quizQuestions[currIndex][a]}
                </button>
              ))}
            </div>}
            {(currIndex < quizQuestions.length) && <div className='flex w-full gap-2'>
              {["a3", "a4"].map((a) => (
                <button
                  className={` p-4 flex flex-grow justify-center items-center bg-purplelight text-black border-2 border-purplelight rounded-xl focus:outline-purpledark shadow-md transition duration-300 hover:bg-purpledark hover:text-white ${speechMode ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                  disabled={speechMode}
                  onClick={() => checkAnswer(quizQuestions[currIndex][a])}
                  key={a}
                >
                  {quizQuestions[currIndex][a]}
                </button>
              ))}
            </div>}
        </div>
    </div>
    );

};

export default Quiz;