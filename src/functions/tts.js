import React, { useState } from 'react';
import { getTokenOrRefresh } from '../token_util';
import { ResultReason } from 'microsoft-cognitiveservices-speech-sdk';

import * as speechsdk from 'microsoft-cognitiveservices-speech-sdk';

import useSound from 'use-sound';

import micOnSound from '../sounds/micOn.wav';
import micOffSound from '../sounds/micOff.wav';

export default function useTTS() {
    const [playMicOnSound] = useSound(micOnSound);
    const [playMicOffSound] = useSound(micOffSound);
    const [displayText, setDisplayText] = useState('INITIALIZED: ready to test speech...');
    const [transcript, setTranscript] = useState('');
    const [listenerState, setListenerState] = useState('stopped');
    const [player, updatePlayer] = useState({p: undefined, muted: false});

    async function sttFromMic() {
        const tokenObj = await getTokenOrRefresh();
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
        speechConfig.speechRecognitionLanguage = 'en-US';
        
        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);

        setDisplayText('speak into your microphone...');
        setListenerState('listening');
        console.log('listening...');
        playMicOnSound();
        recognizer.recognizeOnceAsync(result => {
            if (result.reason === ResultReason.RecognizedSpeech) {
                setDisplayText(`RECOGNIZED: Text=${result.text}`);
                setTranscript(result.text);
                setListenerState('stopped');
                playMicOffSound();
                console.log('stopped listening');
            } else {
                setDisplayText('ERROR: Speech was cancelled or could not be recognized. Ensure your microphone is working properly.');
                setTranscript('');
                setListenerState('stopped');
                playMicOffSound();
                console.log('stopped listening due to error.');
            }
        });
    }
    
    function textToSpeech(textToSpeak, callback) {
        return new Promise(async function (resolve, reject) {
            const tokenObj = await getTokenOrRefresh();
            const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(tokenObj.authToken, tokenObj.region);
            const myPlayer = new speechsdk.SpeakerAudioDestination();
            updatePlayer(p => {p.p = myPlayer; return p;});
            myPlayer.onAudioEnd = function (s) {
                console.log('audio end');
                if (callback) callback();
                resolve();
            };

            // updatePlayer(p => {p.p = myPlayer; return p;});
            // const audioConfig = speechsdk.AudioConfig.fromSpeakerOutput(myPlayer);

            let synthesizer = new speechsdk.SpeechSynthesizer(speechConfig, speechsdk.AudioConfig.fromSpeakerOutput(myPlayer));
            console.log('now playing question');
            setDisplayText(`speaking text: ${textToSpeak}...`);
            synthesizer.speakTextAsync(
            textToSpeak,
            result => {
                let text;
                if (result.reason === speechsdk.ResultReason.SynthesizingAudioCompleted) {
                    text = `synthesis finished for "${textToSpeak}".\n`
                } else if (result.reason === speechsdk.ResultReason.Canceled) {
                    text = `synthesis failed. Error detail: ${result.errorDetails}.\n`
                }
                synthesizer.close();
                synthesizer = undefined;
                setDisplayText(text);
            },
            function (err) {
                setDisplayText(`Error: ${err}.\n`);

                synthesizer.close();
                synthesizer = undefined;
                reject();
            });
        });
    }

    async function handleMute() {
        updatePlayer(p => { 
            if (!p.muted) {
                p.p.pause();
                return {p: p.p, muted: true}; 
            } else {
                p.p.resume();
                return {p: p.p, muted: false}; 
            }
        });
    }
    return { transcript, listenerState, textToSpeech, sttFromMic, handleMute };
};
