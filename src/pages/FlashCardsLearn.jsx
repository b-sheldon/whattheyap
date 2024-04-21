import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useTTS from '../functions/tts';
import useStore from '../store/zustand';
import IconVolumeOn from '../icons/IconVolumeOn';
import IconVolumeOff from '../icons/IconVolumeOff';
import IconBackArrow from '../icons/IconBackArrow';

const timeSleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const FlashcardsLearn = () => {
    const navigate = useNavigate();
    const { currentFlashcards, speechMode, setSpeechMode, currentTitle } = useStore();
    const [currIndex, setCurrIndex] = useState(-1);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const { transcript, listenerState, textToSpeech, sttFromMic, handleMute } = useTTS();
    const [correct, setCorrect] = useState(false);
    const answerBox = useRef(null);

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

    const submitAnswer = (e) => {
        e.preventDefault();
        if (speechMode) return;
        if (currIndex >= currentFlashcards.length) return;
        axios.post('http://localhost:8080/gpt/validate-answer', {
            response: answer,
            answer: currentFlashcards[currIndex].a,
        }).then((validateResponse) => {
            console.dir(validateResponse.data);
            setCorrect(validateResponse.data === 1);
            setCurrIndex(currIndex + 1);
        });
    };

    useEffect(() => {
        startQuiz();
    }, []);




    useEffect(() => {
        if (listenerState === 'stopped' && speechMode) {
            if (transcript) {
                setAnswer(transcript);
                console.log(currIndex);
                axios.post('http://localhost:8080/gpt/validate-answer', {
                    response: transcript,
                    answer: currentFlashcards[currIndex].a,
                }).then((validateResponse) => {
                    console.dir(validateResponse.data);
                    setCorrect(validateResponse.data === 1);
                    setCurrIndex(currIndex + 1);
                });
            } else {
                if (currIndex >= 0 && currIndex < currentFlashcards.length) {
                    textToSpeech(currentFlashcards[currIndex].q).then(() => {
                        sttFromMic();
                        answerBox.current.focus();
                    });
                }
            }
        }
    }, [listenerState]);


    const handleNextQuesion = async () => {
        if (currIndex === 0) {
            await condTTS(currentFlashcards[currIndex].q);
            answerBox.current.focus();
            condSTT();
        }
        else if (currIndex < currentFlashcards.length && currIndex > 0) {
            const feedback = correct ? 'Correct!' : `Incorrect. The correct answer was: ${currentFlashcards[currIndex - 1].a}.`;
            setFeedback(feedback);
            await condTTS(feedback);
            setAnswer('');
            if (!speechMode) await timeSleep(3000);
            setFeedback('');
            await condTTS(`${currentFlashcards[currIndex].q}`);
            answerBox.current.focus();   
            condSTT();
        } else if (currIndex >= currentFlashcards.length) {
            const feedback = correct ? 'Correct!' : `Incorrect. The correct answer was: ${currentFlashcards[currIndex - 1].a}.`
            setFeedback(feedback);
            await condTTS(feedback);
            if (!speechMode) await timeSleep(3000);
            setFeedback('');
            await condTTS('Quiz complete.');
        }
    };

    const answerBoxInput = (e) => {
        if (speechMode) return;
        setAnswer(e.target.value);
    }

    const answerBoxPlaceholder = () => {
        if (!speechMode) return 'Type your answer here...';
        if (listenerState === 'listening') return 'Please say your answer now...';
        return '';
    
    }

    const questionBoxText = () => {
        if (!feedback) {
            if (currIndex < currentFlashcards.length) return currentFlashcards[currIndex].q;
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
        console.log('starting speech mode');
        await textToSpeech(currentFlashcards[currIndex].q);
        sttFromMic();
        answerBox.current.focus();
    }


    useEffect(() => {
        handleNextQuesion();
    }, [currIndex]);


    if (currentFlashcards.length === 0 || currIndex < 0) return <div>Loading...</div>;

    return (
    <div className="flex-grow flex flex-col items-center p-10 gap-6 text-xl">
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
            <form onSubmit={submitAnswer} className='w-full flex flex-col items-center gap-6'>
                <textarea
                    ref={answerBox}
                    className="text-xl p-4 w-full h-28 border-2 resize-none border-purplelight rounded-xl  focus:outline-purpledark shadow-md"
                    value={answer}
                    onChange={answerBoxInput}
                    placeholder={answerBoxPlaceholder()}
                />
                { !speechMode && 
                <button type="submit" disabled={listenerState === 'listening'} className="self-end border-2 py-1 px-3 rounded-xl cursor-pointer border-green-800 text-green-800 shadow-md">submit</button>
                }
            </form>
        </div>
    </div>
    );

};

export default FlashcardsLearn;