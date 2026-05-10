import { Link, useLocation } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { NO_IMAGE_URL } from '../../utils/constants';

export default function ItemCard({ item }) {
    const location = useLocation();
    const date = new Date(item.date).toLocaleDateString('uk-UA');

    return (
        <Link
            to={`/item/${item._id}`}
            state={{ from: location.pathname }}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
        >
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                    src={item.imageUrl || NO_IMAGE_URL}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = NO_IMAGE_URL;
                    }}
                />
                <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm ${
                        item.type === 'lost' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}>
                        {item.type === 'lost' ? 'Загублено' : 'Знайдено'}
                    </span>
                </div>
            </div>
            <div className="p-4 space-y-3 flex-grow">
                <h3 className="font-bold text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {item.title}
                </h3>
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <MapPin size={14} className="text-blue-500" />
                        <span className="truncate">{item.city}, {item.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <Calendar size={14} className="text-blue-500" />
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}