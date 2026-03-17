import { useState } from 'react';

export default function AddItemForm({ onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        city: '',
        place: '',
        type: 'lost',
        image: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Дані форми:', formData);
        
        alert('Оголошення успішно додано (імітація)');
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className="flex bg-gray-100 p-1 rounded-xl">
                <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'lost'})}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.type === 'lost' ? 'bg-red-500 text-white shadow-md' : 'text-gray-500'}`}
                >
                    Я загубив
                </button>
                <button
                    type="button"
                    onClick={() => setFormData({...formData, type: 'found'})}
                    className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.type === 'found' ? 'bg-green-500 text-white shadow-md' : 'text-gray-500'}`}
                >
                    Я знайшов
                </button>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Назва предмета</label>
                <input
                    required
                    type="text"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Наприклад: Ключі від авто"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Місто</label>
                    <input
                        required
                        type="text"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Місце (район)</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.place}
                        onChange={(e) => setFormData({...formData, place: e.target.value})}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Опис</label>
                <textarea
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Опишіть деталі..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 font-medium"
                >
                    Скасувати
                </button>
                <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-200"
                >
                    Опублікувати
                </button>
            </div>
        </form>
    );
}