import { create } from 'zustand';

export const useModalStore = create((set) => ({
    isOpen: false,
    modalData: null,
    mode: null,
    openModal: (data = null, mode = 'add') => set({
        isOpen: true,
        modalData: data,
        mode: data ? 'edit' : mode
    }),
    closeModal: () => set({
        isOpen: false,
        modalData: null,
        mode: null
    }),
}));