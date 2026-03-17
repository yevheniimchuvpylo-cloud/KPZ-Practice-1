import { Link } from 'react-router-dom';
import { UserCircle, PlusSquare } from 'lucide-react';
import { useModalStore } from '../../store/useModalStore';
import { useAuthStore } from '../../store/useAuthStore';



export default function Header() {
    const openModal = useModalStore((state) => state.openModal);
    const { user, isLoggedIn } = useAuthStore();
    return (
        <header className="flex justify-between items-center px-6 py-4 bg-white border-b border-gray-100 shadow-sm">

            <Link to="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
                Бюро знахідок
            </Link>


            <nav className="flex items-center gap-6">
                <button
                    onClick={openModal}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-all active:scale-95"
                >
                    <PlusSquare size={20} />
                    <span className="hidden sm:inline">Подати оголошення</span>
                </button>

                <Link to="/profile" className="transition-transform hover:scale-105">
                    {isLoggedIn ? (
                        <img
                            src={user.photo}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                        />
                    ) : (
                        <UserCircle size={32} className="text-gray-500 hover:text-blue-600" />
                    )}
                </Link>
            </nav>
        </header>
    );
}