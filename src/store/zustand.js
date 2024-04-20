import { create } from 'zustand';

const useStore = create((set) => ({
    userId: null,
    currentFlashcards: [],
    currentTitle: '',
    allFlashcards: [],
    sidebarCollapsed: false,
    setCurrentFlashcards: (currentFlashcards) => set({ currentFlashcards }),
    setCurrentTitle: (currentTitle) => set({ currentTitle }),
    setAllFlashcards: (allFlashcards) => set({ allFlashcards }),
    setUserId: (userId) => set({ userId }),
    setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
}));

export default useStore;
