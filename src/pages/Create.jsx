/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createFlashcardSet, fetchFlashcards } from '../functions/flashcards';

// replace w/ redux later
const userId = 'TbNeMzejY8WlAenoFZruIt5yji62';

function Create() {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const createFlashcardsRequest = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post('http://localhost:8080/gpt/generate-flashcards', {
        notes,
      });
      console.log(response);
      await createFlashcardSet(title, response.data.flashcards, userId);
      await fetchFlashcards(); // Fetch the latest list of flashcards to include the new one
      navigate('/dashboard'); // Navigate to a new page on success
    } catch (error) {
      console.error('Error creating flashcards:', error);
    } finally {
      setLoading(false); // Stop loading irrespective of success or failure
    }
  };
  return (
    <div className="flex flex-col gap-4 m-4">
      <div className="">
        Hello. Paste or Upload your notes to create a new set of Flashcards.
      </div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title of the flashcard set"
        className="p-2 border rounded"
      />
      <textarea
        className="p-4 border resize-none rounded-xl"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button
        className="p-4 bg-red-500 shadow rounded-xl"
        type="button"
        onClick={createFlashcardsRequest}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Create Flashcards'}
      </button>
    </div>
  );
}

export default Create;
