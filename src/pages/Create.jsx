/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createFlashcardSet, fetchFlashcards } from '../functions/flashcards';
import useStore from '../store/zustand';
import pdfToText from 'react-pdftotext'
import mammoth from 'mammoth';
import { API_URL } from '../functions/config';

function Create() {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const { userId } = useStore();
  const navigate = useNavigate(); // Hook for navigation
  const { setCurrentFlashcards } = useStore();
  const { setCurrentTitle } = useStore();

  const createFlashcardsRequest = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.post(`${API_URL}/gpt/generate-flashcards`, {
        notes,
      });
      console.log(response);
      await createFlashcardSet(title, response.data.flashcards, userId);
      await fetchFlashcards(userId); // Fetch the latest list of flashcards to include the new one
      setCurrentTitle(title);
      setCurrentFlashcards(response.data.flashcards);
      navigate('/dashboard'); // Navigate to a new page on success
    } catch (error) {
      console.error('Error creating flashcards:', error);
    } finally {
      setLoading(false); // Stop loading irrespective of success or failure
    }
  };

  const handleFileChange = async (event) => {
    for (const file of event.target.files) {
      const fileExt = file.name.split('.').pop();

      if (fileExt === 'txt') {
        const reader = new FileReader();
        reader.onload = (e) => {
          setNotes((prevNotes) => prevNotes + e.target.result + '\n');
        };
        reader.readAsText(file);
      } 

      else if (fileExt === 'pdf') {
        const file = event.target.files[0]
        pdfToText(file)
            .then((result) => setNotes((prevNotes) => prevNotes + result))
            .catch(error => console.error("Failed to extract text from pdf"));
      } 
      
      else if (fileExt === 'docx') {
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target.result;
          mammoth.extractRawText({ arrayBuffer })
            .then((result) => {
              setNotes((prevNotes) => prevNotes + result.value + '\n');
            })
            .catch((error) => console.error('Error reading docx:', error));
        };
        reader.readAsArrayBuffer(file);
      } 
      
      else {
        alert(fileExt + " is not yet supported. Please upload a .txt, .pdf, or .docx file.");
        event.target.value = null;
      }
    }
  };

  return (
    <div className="w-full">

      <div className="flex flex-col justify-center gap-4 pl-4 pr-4 ml-auto mr-auto">
        <div className="text-3xl text-center">
          Welcome. Paste or Upload your notes to create a new set of Flashcards.
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title of your study set."
          className="p-4 text-2xl border border-2 rounded border-purplelight focus:outline-purpledark"
        />
        <textarea
          className="p-4 text-xl border border-2 resize-none border-purplelight rounded-xl h-1/4 focus:outline-purpledark"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder='Paste notes here.'
        />

        <div className="flex flex-row justify-end gap-4">
        <div>
          <p>Upload as many files you wish to convert to text.</p>
          <p>Accepted file formats: .txt, .pdf, and .docx</p>
        </div>
          <input
            type="file"
            accept=".txt,.pdf,.docx"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="p-4 text-xl transition-transform shadow cursor-pointer bg-purpledark rounded-xl hover:scale-105"
          >
            <i className="fa-solid fa-file-arrow-up"></i> Upload Document
          </label>

          <button
            className="p-4 text-xl transition-transform shadow bg-purpledark rounded-xl hover:scale-105"
            type="button"
            onClick={createFlashcardsRequest}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Create Flashcards'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Create;
