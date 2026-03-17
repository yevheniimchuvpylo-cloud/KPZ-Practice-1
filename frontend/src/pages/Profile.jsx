import { useAuthStore } from '../store/useAuthStore';
import ItemCard from '../components/items/ItemCard';
import { Mail, MapPin, Phone, Trash2, LogOut } from 'lucide-react';


const MY_MOCK_ITEMS = [
    { id: 1, title: 'iPhone 13 Pro (Blue)', city: 'Київ', date: '15.03.2026', type: 'lost', image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=400&q=80' },
];

export default function Profile() {
    const { user, logout } = useAuthStore();

    if (!user) return <div className="text-center py-20">Будь ласка, увійдіть в аккаунт</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-10">

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start">
                <img src={user.photo} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-blue-50 object-cover" />

                <div className="flex-grow space-y-4 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500">
                        <div className="flex items-center gap-2"><Mail size={18} /> {user.email}</div>
                        <div className="flex items-center gap-2"><Phone size={18} /> {user.phone}</div>
                        <div className="flex items-center gap-2"><MapPin size={18} /> {user.city}</div>
                    </div>
                </div>

                <div className="flex flex-col gap-2 w-full md:w-auto">
                    <button onClick={logout} className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors">
                        <LogOut size={18} /> Вийти
                    </button>
                    <button onClick={() => alert('Запит на видалення аккаунту')} className="text-sm text-red-400 hover:text-red-600 underline">
                        Видалити аккаунт
                    </button>
                </div>
            </div>


            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Мої оголошення</h2>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
            Всього: {MY_MOCK_ITEMS.length}
          </span>
                </div>

                {MY_MOCK_ITEMS.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {MY_MOCK_ITEMS.map((item) => (
                            <div key={item.id} className="relative group">
                                <ItemCard item={item} />
                                <button
                                    onClick={() => alert('Оголошення видалено')}
                                    className="absolute top-2 right-2 p-2 bg-white/90 text-red-500 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                    title="Видалити оголошення"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
                        Ви ще не створили жодного оголошення
                    </div>
                )}
            </div>
        </div>
    );
}