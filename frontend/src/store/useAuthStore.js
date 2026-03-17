import { create } from 'zustand';

export const useAuthStore = create((set) => ({

    user: {
        id: 'user123',
        name: 'Олександр Коваль',
        email: 'alex.k@gmail.com',
        city: 'Івано-Франківськ',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        phone: '+380 67 123 45 67'
    },
    isLoggedIn: true,
    logout: () => set({ user: null, isLoggedIn: false }),
}));