import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import api from '../api/axios';
import ItemCard from '../components/items/ItemCard';
import { Mail, LogOut, Trash2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const { user, logout, deleteAccount } = useAuthStore();
    const [myItems, setMyItems] = useState([]);
    const [isLoadingItems, setIsLoadingItems] = useState(true);
    const navigate = useNavigate();
    const avatarPlaceholder = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0D8ABC&color=fff&size=128`;

    const fetchMyItems = async () => {
        try {
            setIsLoadingItems(true);
            const response = await api.get('/items/my');
            setMyItems(response.data);
        } catch (err) {
            console.error('Помилка завантаження оголошень:', err);
        } finally {
            setIsLoadingItems(false);
        }
    };

    useEffect(() => {
        if (user) fetchMyItems();
    }, [user]);

    const handleDeleteItem = async (id) => {
        if (!window.confirm('Ви впевнені, що хочете видалити це оголошення?')) return;
        try {
            await api.delete(`/items/${id}`);
            setMyItems(prev => prev.filter(item => item._id !== id));
            alert('Оголошення видалено');
        } catch (err) {
            alert('Не вдалося видалити оголошення');
            console.log(err);
        }
    };
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const handleDeleteAccount = async () => {
        const confirm = window.confirm(
            'УВАГА! Це назавжди видалить ваш профіль та всі ваші оголошення. Ви впевнені?'
        );
        if (confirm) {
            const res = await deleteAccount();
            if (res.success) {
                alert('Ваш акаунт видалено');
                navigate('/');
            } else {
                alert('Помилка при видаленні: ' + res.message);
            }
        }
    };
    if (!user) return <div className="text-center py-20">Будь ласка, увійдіть в аккаунт</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-10 p-6">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
                        <img
                            src={user.photo || avatarPlaceholder}
                            alt={user.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = avatarPlaceholder;
                            }}
                        />
                    </div>
                    <div className="flex-grow text-center md:text-left space-y-2">
                        <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                        <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 font-medium">
                            <Mail size={18} className="text-blue-500" />
                            <span>{user.email}</span>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <button
                            onClick={handleLogout}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                        >
                            <LogOut size={18} /> Вийти
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
                        >
                            <Trash2 size={18} /> Видалити акаунт
                        </button>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50" />
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Мої оголошення</h2>
                    <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
                        Всього: {myItems.length}
                    </span>
                </div>
                {isLoadingItems ? (
                    <div className="flex justify-center py-20 text-blue-500">
                        <Loader2 className="animate-spin" size={40} />
                    </div>
                ) : myItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myItems.map((item) => (
                            <div key={item._id} className="relative group">
                                <ItemCard item={item} />
                                <button
                                    onClick={() => handleDeleteItem(item._id)}
                                    className="absolute top-2 right-2 p-2 bg-white/95 text-red-500 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                    title="Видалити оголошення"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-100 text-gray-400 font-medium">
                        У вас поки немає активних оголошень
                    </div>
                )}
            </div>
        </div>
    );
}