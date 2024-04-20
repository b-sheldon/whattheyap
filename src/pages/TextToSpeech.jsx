import React, { useState } from 'react';
import useTTS from '../functions/tts';
import 'tailwindcss/tailwind.css';

export default function TextToSpeech() { 

    const { transcript, listenerState, textToSpeech, sttFromMic, handleMute } = useTTS();
    const [ttsText, setTtsText] = useState('');

    return (
        <div className="app-container">
            <h1 className="flex">Speech sample app</h1>
            {listenerState === 'listening' && <div className="">Listening...</div>}
            <div className="row main-container">
                <div className="col-6">
                    <button onClick={sttFromMic} className='bg-white rounded p-2'>STT</button>

                    <div className="mt-2">
                        <input type="text" value={ttsText} onChange={(e) => setTtsText(e.target.value)} />
                        <button onClick={() => textToSpeech(ttsText )} className='bg-white rounded p-2'>TTS</button>
                    </div>
                </div>
                <div className="col-6 output-display rounded">
                    <code>{transcript}</code>
                </div>
            </div>
        </div>
    );
}