import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/axios';

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoggedIn: false,
            isLoading: false,
            error: null,
            loginWithGoogle: async (idToken) => {
                set({ isLoading: true, error: null });
                try {
                    const response = await api.post('/auth/verify', {}, {
                        headers: { 'Authorization': `Bearer ${idToken}` }
                    });
                    set({
                        user: response.data.user,
                        token: idToken,
                        isLoggedIn: true,
                        isLoading: false
                    });
                    api.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;

                    return { success: true };
                } catch (err) {
                    set({ error: 'Помилка авторизації', isLoading: false });
                    console.log(err);
                    return { success: false };
                }
            },

            logout: () => {
                delete api.defaults.headers.common['Authorization'];
                set({ user: null, token: null, isLoggedIn: false });
            },
            deleteAccount: async () => {
                try {
                    set({ isLoading: true });
                    await api.delete('/auth/me');
                    get().logout();
                    return { success: true };
                } catch (err) {
                    console.error('Помилка видалення акаунта:', err);
                    set({ isLoading: false });
                    return { success: false, message: err.response?.data?.message };
                }
            }
        }),
        {
            name: 'auth-storage',
        }
    )
);