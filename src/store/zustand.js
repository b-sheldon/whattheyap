import { create } from 'zustand';

const useStore = create((set) => ({
    userId: null,
    currentFlashcards: [],
    allFlashcards: [],
    setCurrentFlashcards: (currentFlashcards) => set({ currentFlashcards }),
    setAllFlashcards: (allFlashcards) => set({ allFlashcards }),
    setUserId: (userId) => set({ userId }),
}));

export default useStore;
