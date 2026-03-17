import { useState } from 'react';
import ItemCard from '../components/items/ItemCard';
import { Search } from 'lucide-react';

const MOCK_ITEMS = [
    { id: 1, title: 'iPhone 13 Pro (Blue)', city: 'Київ', date: '15.03.2026', type: 'lost', image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&w=400&q=80' },
    { id: 2, title: 'Золота каблучка', city: 'Львів', date: '14.03.2026', type: 'found', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80' },
    { id: 3, title: 'Ключі від авто BMW', city: 'Одеса', date: '12.03.2026', type: 'found', image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=400&q=80' },
    { id: 4, title: 'Собака (Хаскі)', city: 'Харків', date: '10.03.2026', type: 'lost', image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=400&q=80' },
];

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeType, setActiveType] = useState('all'); // 'all', 'lost', 'found'

    // Логіка фільтрації
    const filteredItems = MOCK_ITEMS.filter(item => {
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
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                                activeType === type
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {type === 'all' ? 'Всі' : type === 'lost' ? 'Загублено' : 'Знайдено'}
                        </button>
                    ))}
                </div>
            </div>

            
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-500">
                    Нічого не знайдено за вашим запитом 🔍
                </div>
            )}
        </div>
    );
}