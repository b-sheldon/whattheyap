const API_URL = 'http://localhost:8080/flashcards';

export const fetchFlashcards = async (userId) => {
  const response = await fetch(API_URL + `/user/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch flashcards');
  }
  return response.json();
};

export const createFlashcardSet = async (title, cards, userId) => {
  const response = await fetch(API_URL, {
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
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, cards }),
  });
  if (!response.ok) {
    throw new Error('Failed to update flashcard set');
  }
  return response;
}
