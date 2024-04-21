import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
    userId: null,
    currentFlashcards: [],
    currentTitle: '',
    currentID: '',
    allFlashcards: [],
    sidebarCollapsed: false,
    speechMode: false,
};

const useStore = create(persist((set, get) => ({
    userId: null,
    quizQuestions: [],
    currentFlashcards: [],
    currentTitle: '',
    currentID: '',
    allFlashcards: [],
    sidebarCollapsed: false,
    speechMode: false,
    setQuizQuestions: (quizQuestions) => set({ quizQuestions }),
    setSpeechMode: (speechMode) => set({ speechMode }),
    setCurrentFlashcards: (currentFlashcards) => set({ currentFlashcards }),
    setCurrentTitle: (currentTitle) => set({ currentTitle }),
    setAllFlashcards: (allFlashcards) => set({ allFlashcards }),
    setUserId: (userId) => set({ userId }),
    setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
    setCurrentID: (currentId) => set({ currentId }),
    logout: () => set({ ...initialState }),
}),
{
    name: 'user-storage',
    getStorage: () => localStorage,
}));

export default useStore;
