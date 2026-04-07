import { useState } from 'react';
import api from '../../api/axios';
import { Loader2 } from 'lucide-react';

export default function AddItemForm({ onClose, initialData = null }) {
    const [isLoading, setIsLoading] = useState(false);
    const isEditMode = !!initialData;
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        city: initialData?.city || '',
        location: initialData?.location || '',
        type: initialData?.type || 'lost',
        imageUrl: initialData?.imageUrl || ''
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isEditMode) {
                await api.patch(`/items/${initialData._id}`, formData);
                alert('Оновлено!');
            } else {
                await api.post('/items/add', formData);
                alert('Опубліковано!');
            }
            onClose();
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Помилка API');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex bg-gray-100 p-1 rounded-xl">
                {['lost', 'found'].map(t => (
                    <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({...formData, type: t})}
                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                            formData.type === t
                                ? (t === 'lost' ? 'bg-red-500 text-white' : 'bg-green-500 text-white')
                                : 'text-gray-500'
                        }`}
                    >
                        {t === 'lost' ? 'Я загубив' : 'Я знайшов'}
                    </button>
                ))}
            </div>
            <input
                required
                placeholder="Назва"
                className="w-full px-4 py-2 border rounded-xl"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
                <input
                    required
                    placeholder="Місто"
                    className="w-full px-4 py-2 border rounded-xl"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
                <input
                    required
                    placeholder="Місце/Район"
                    className="w-full px-4 py-2 border rounded-xl"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
            </div>
            <textarea
                required
                placeholder="Опис"
                className="w-full px-4 py-2 border rounded-xl"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <input
                placeholder="URL фото"
                className="w-full px-4 py-2 border rounded-xl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            />
            <div className="flex gap-3 pt-4">
                <button type="button" onClick={onClose} className="flex-1 py-2 border rounded-xl">Скасувати</button>
                <button type="submit" disabled={isLoading} className="flex-1 py-2 bg-blue-600 text-white rounded-xl flex justify-center">
                    {isLoading ? <Loader2 className="animate-spin" /> : (isEditMode ? 'Зберегти' : 'Опублікувати')}
                </button>
            </div>
        </form>
    );
}