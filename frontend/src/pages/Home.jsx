import { useState, useEffect } from 'react';
import ItemCard from '../components/items/ItemCard';
import api from '../api/axios';
import { Search, Loader2 } from 'lucide-react';

export default function Home() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeType, setActiveType] = useState('all');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setIsLoading(true);
                const response = await api.get('/items');
                setItems(response.data);
            } catch (err) {
                console.error('Помилка завантаження:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
    }, []);

    const filteredItems = items.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = activeType === 'all' || item.type === activeType;
        return matchesSearch && matchesType;
    });
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Пошук за назвою..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto">
                    {['all', 'lost', 'found'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`flex-1 md:px-6 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                activeType === type ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'
                            }`}
                        >
                            {type === 'all' ? 'Всі' : type === 'lost' ? 'Загублено' : 'Знайдено'}
                        </button>
                    ))}
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-blue-500" size={40} />
                </div>
            ) : filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <ItemCard key={item._id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500">
                    {items.length === 0 ? "Оголошень поки немає ➕" : "Нічого не знайдено 🔍"}
                </div>
            )}
        </div>
    );
}