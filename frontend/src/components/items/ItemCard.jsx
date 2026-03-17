import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';

export default function ItemCard({ item }) {
    const isLost = item.type === 'lost';

    return (
        <Link to={`/item/${item.id}`} className="group bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">

            <div className="relative h-48 bg-gray-200">
                <img
                    src={item.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={item.title}
                    className="w-full h-full object-cover"
                />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    isLost ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}>
          {isLost ? 'Загублено' : 'Знайдено'}
        </span>
            </div>


            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                    {item.title}
                </h3>

                <div className="mt-3 space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span>{item.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span>{item.date}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}