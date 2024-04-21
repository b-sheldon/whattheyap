import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
    userId: null,
    currentFlashcards: [],
    currentTitle: '',
    allFlashcards: [],
    sidebarCollapsed: false,
    speechMode: true,
};

const useStore = create(persist((set, get) => ({
    userId: null,
    currentFlashcards: [],
    currentTitle: '',
    allFlashcards: [],
    sidebarCollapsed: false,
    speechMode: true,
    setSpeechMode: (speechMode) => set({ speechMode }),
    setCurrentFlashcards: (currentFlashcards) => set({ currentFlashcards }),
    setCurrentTitle: (currentTitle) => set({ currentTitle }),
    setAllFlashcards: (allFlashcards) => set({ allFlashcards }),
    setUserId: (userId) => set({ userId }),
    setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
    logout: () => set({ ...initialState }),
}),
{
    name: 'user-storage',
    getStorage: () => localStorage,
}));

export default useStore;
