import { create } from 'zustand';

const useStore = create((set) => ({
    userId: null,
    currentFlashCards: null,
    allFlashCards: null,
    setVids: (currentFlashCards) => set({ currentFlashCards }),
    selectVid: (allFlashCards) => set({ allFlashCards }),
    setUserId: (userId) => set({ userId }),
}));

export default useStore;
