const API_URL = 'http://localhost:8080/flashcards';

export const fetchFlashcards = async () => {
  const response = await fetch(API_URL);
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
