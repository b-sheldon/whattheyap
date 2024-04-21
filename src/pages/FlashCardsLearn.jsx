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
    const { currentFlashcards } = useStore();
    const [currIndex, setCurrIndex] = useState(-1);
    const { transcript, listenerState, textToSpeech, sttFromMic, handleMute } = useTTS();
    const [correct, setCorrect] = useState(false);

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

    useEffect(() => {
        if (currIndex === 0) {
            console.log("called this");
            textToSpeech(currentFlashcards[currIndex].q, sttFromMic);
        }
        else if (currIndex < currentFlashcards.length && currIndex > 0) {
            const feedback = feedbackText(correct, currentFlashcards[currIndex - 1], currentFlashcards[currIndex]);
            textToSpeech(feedback, sttFromMic);
            sttFromMic();
        } else if (currIndex >= currentFlashcards.length) {
            const feedback = feedbackText(correct, currentFlashcards[currIndex - 1], null);
            textToSpeech(feedback, null);
        }
    }, [currIndex]);

    return (
    <div>
        <button onClick={startQuiz}>fart</button>
        {listenerState}
    </div>
    );

};

export default FlashcardsLearn;