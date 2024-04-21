import { API_URL } from './config'

export const fetchFlashcards = async (userId) => {
  const response = await fetch(`${API_URL}/flashcards/user/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch flashcards');
  }
  return response.json();
};

export const createFlashcardSet = async (title, cards, userId) => {
  const response = await fetch(`${API_URL}/flashcards`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, cards, userId }),
  });
  if (!response.ok) {
    throw new Error('Failed to create flashcard set');
  }
  return response.json();
};

export const updateFlashcardSet = async (id, title, cards) => {
  const response = await fetch(`${API_URL}/flashcards/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, cards }),
  });
  if (!response.ok) {
    throw new Error('Failed to update flashcard set');
  }
  return response;
}

export const deleteFlashcardSet = async (id) => {
  const response = await fetch(`${API_URL}/flashcards/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete flashcard set');
  }
  return response;
}
