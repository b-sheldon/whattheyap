import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useTTS from '../functions/tts';
import useStore from '../store/zustand';

const feedbackText = (correct, prevQuestion, nextQuestion) => {
    if (correct && nextQuestion) return 'Correct! Next question is ' + nextQuestion.q;
    if (correct && !nextQuestion) return 'Correct! Quiz complete.';
    if (!correct && nextQuestion) return `Incorrect. The correct answer was: ${prevQuestion.a}. Next question... ${nextQuestion.q}`;
    if (!correct && !nextQuestion) return `Incorrect. The correct answer was: ${prevQuestion.a}. Quiz complete.`; 
};

const FlashcardsLearn = () => {
    const { currentFlashcards, speechMode, setSpeechMode } = useStore();
    const [currIndex, setCurrIndex] = useState(-1);
    const { transcript, listenerState, textToSpeech, sttFromMic, handleMute } = useTTS();
    const [correct, setCorrect] = useState(false);

    const condTTS = async (text) => {
        if (!speechMode) return;
        await textToSpeech(text);
    };

    const startQuiz = () => {
        setCurrIndex(0);
    }

    useEffect(() => {
        if (listenerState === 'stopped') {
            if (transcript) {
                console.log(currIndex);
                axios.post('http://localhost:8080/gpt/validate-answer', {
                    response: transcript,
                    answer: currentFlashcards[currIndex].a,
                }).then((validateResponse) => {
                    console.dir(validateResponse.data);
                    if (validateResponse.data === 1) {
                        setCorrect(true);
                    } else {
                        setCorrect(false);
                    }
                    setCurrIndex(currIndex + 1);
                });
            }
        } else if (listenerState === 'listening') {
            // 
        }
    }, [listenerState]);


    const handleNextQuesion = async () => {
        if (currIndex === 0) {
            await condTTS(currentFlashcards[currIndex].q);
            sttFromMic();
        }
        else if (currIndex < currentFlashcards.length && currIndex > 0) {
            const feedback = correct ? 'Correct!' : `Incorrect. The correct answer was: ${currentFlashcards[currIndex - 1].a}.`;
            await condTTS(feedback);
            await condTTS(`Next question is: ${currentFlashcards[currIndex].q}`);
            sttFromMic();
        } else if (currIndex >= currentFlashcards.length) {
            const feedback = correct ? 'Correct!' : `Incorrect. The correct answer was: ${currentFlashcards[currIndex - 1].a}.`
            await condTTS(feedback);
            await condTTS('Quiz complete.');
        }
    };

    useEffect(() => {
        handleNextQuesion();
    }, [currIndex]);

    return (
    <div>
        <button onClick={startQuiz}>fart</button>
        <div>{listenerState}</div>
        <div onClick={() => setSpeechMode(val => !val)}>{speechMode ? 'speech mode!' : 'text mode.'}</div>
    </div>
    );

};

export default FlashcardsLearn;