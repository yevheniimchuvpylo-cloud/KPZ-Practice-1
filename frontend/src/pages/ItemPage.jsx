import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useModalStore } from '../store/useModalStore';
import api from '../api/axios';
import { MapPin, Calendar, User, ArrowLeft, Edit3, Trash2, Loader2 } from 'lucide-react';
import { NO_IMAGE_URL } from '../utils/constants';

export default function ItemPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuthStore();
    const openModal = useModalStore((state) => state.openModal);
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const backPath = location.state?.from || '/';

    useEffect(() => {
        const fetchItem = async () => {
            try {
                setIsLoading(true);
                const response = await api.get(`/items/${id}`);
                setItem(response.data);
            } catch (err) {
                if (err.response?.status !== 400 && err.response?.status !== 404) {
                    console.error('Помилка завантаження оголошення:', err);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchItem();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm('Ви впевнені, що хочете видалити це оголошення?')) return;
        try {
            await api.delete(`/items/${id}`);
            alert('Видалено успішно');
            navigate(backPath);
        } catch (err) {
            alert('Помилка при видаленні');
            console.error(err.message);
        }
    };
    const handleEdit = () => {
        if (item) {
            openModal(item);
        }
    };
    if (isLoading) {
        return (
            <div className="flex justify-center py-20 text-blue-500">
                <Loader2 className="animate-spin" size={40} />
            </div>
        );
    }
    if (!item) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-800">Оголошення не знайдено</h2>
                <button
                    onClick={() => navigate('/')}
                    className="text-blue-500 hover:text-blue-600 font-medium underline mt-4"
                >
                    Повернутися на головну
                </button>
            </div>
        );
    }
    const isOwner = user && item.userId && (user._id === item.userId._id || user._id === item.userId);
    return (
        <div className="max-w-4xl mx-auto p-4">
            <button
                onClick={() => navigate(backPath)}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors font-medium"
            >
                <ArrowLeft size={20} />
                {backPath === '/profile' ? 'Назад до профілю' : 'Назад до списку'}
            </button>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="h-80 md:h-auto bg-gray-100">
                        <img
                            src={item.imageUrl || NO_IMAGE_URL}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = NO_IMAGE_URL;
                            }}
                        />
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                item.type === 'lost' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                            }`}>
                                {item.type === 'lost' ? 'Загублено' : 'Знайдено'}
                            </span>
                            <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        <div className="space-y-3 pt-4 border-t border-gray-50 text-gray-700">
                            <div className="flex items-center gap-3">
                                <MapPin className="text-blue-500" size={20} />
                                <span>{item.city}{item.location ? `, ${item.location}` : ''}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="text-blue-500" size={20} />
                                <span>{new Date(item.date).toLocaleDateString('uk-UA')}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <User className="text-blue-500" size={20} />
                                <span>{item.userId?.name || 'Анонімний користувач'}</span>
                            </div>
                        </div>
                        {isOwner && (
                            <div className="flex gap-3 pt-6">
                                <button
                                    onClick={handleEdit}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors"
                                >
                                    <Edit3 size={18} /> Редагувати
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-medium transition-colors"
                                >
                                    <Trash2 size={18} /> Видалити
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}