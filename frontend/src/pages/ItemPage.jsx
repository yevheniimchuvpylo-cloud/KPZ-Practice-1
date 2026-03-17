import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { MapPin, Calendar, User, ArrowLeft, Edit3, Trash2 } from 'lucide-react';


const ITEMS_DATA = [
    { id: '1', title: 'iPhone 13 Pro (Blue)', description: 'Був загублений у районі центрального парку...', city: 'Київ', place: 'Центральний парк', date: '15.03.2026', type: 'lost', image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=800&q=80', authorId: 'user123', authorName: 'Олександр Коваль' },
    { id: '2', title: 'Золота каблучка', description: 'Знайдена біля входу в ТРЦ. Поверну власнику після опису гравіювання.', city: 'Львів', place: 'ТРЦ Victoria Gardens', date: '14.03.2026', type: 'found', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80', authorId: 'user456', authorName: 'Марія' },
    { id: '3', title: 'Ключі від авто BMW', description: 'Знайдено зв’язку ключів з брелоком BMW.', city: 'Одеса', place: 'Приморський бульвар', date: '12.03.2026', type: 'found', image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=800&q=80', authorId: 'user789', authorName: 'Дмитро' },
    { id: '4', title: 'Собака (Хаскі)', description: 'Загубився пес, відгукується на кличку "Арчі". Має блакитні очі.', city: 'Харків', place: 'Салтівка', date: '10.03.2026', type: 'lost', image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80', authorId: 'user123', authorName: 'Олександр Коваль' },
];

export default function ItemPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();


    const item = ITEMS_DATA.find(item => item.id === id);


    if (!item) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold">Оголошення не знайдено</h2>
                <button onClick={() => navigate('/')} className="text-blue-500 underline mt-4">Повернутися на головну</button>
            </div>
        );
    }

    const isOwner = user && user.id === item.authorId;

    return (
        <div className="max-w-4xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition-colors"
            >
                <ArrowLeft size={20} /> Назад
            </button>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="h-80 md:h-auto bg-gray-100">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="p-8 space-y-6">
                        <div className="space-y-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  item.type === 'lost' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}>
                {item.type === 'lost' ? 'Загублено' : 'Знайдено'}
              </span>
                            <h1 className="text-3xl font-bold text-gray-900">{item.title}</h1>
                        </div>

                        <p className="text-gray-600 leading-relaxed">{item.description}</p>

                        <div className="space-y-3 pt-4 border-t border-gray-50 text-gray-700">
                            <div className="flex items-center gap-3"><MapPin className="text-blue-500" size={20} /><span>{item.city}, {item.place}</span></div>
                            <div className="flex items-center gap-3"><Calendar className="text-blue-500" size={20} /><span>{item.date}</span></div>
                            <div className="flex items-center gap-3"><User className="text-blue-500" size={20} /><span>{item.authorName}</span></div>
                        </div>

                        {isOwner && (
                            <div className="flex gap-3 pt-6">
                                <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-colors">
                                    <Edit3 size={18} /> Редагувати
                                </button>
                                <button className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-medium transition-colors">
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