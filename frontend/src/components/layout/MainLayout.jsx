import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Modal from '../common/Modal';
import AddItemForm from '../items/AddItemForm';
import GoogleLoginButton from '../auth/GoogleLoginButton';
import { useModalStore } from '../../store/useModalStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
    const { isOpen, closeModal, modalData, mode } = useModalStore();
    const { isLoggedIn } = useAuthStore();

    useEffect(() => {
        if (isLoggedIn && isOpen && mode === 'auth') {
            closeModal();
        }
    }, [isLoggedIn, isOpen, mode, closeModal]);

    const getModalTitle = () => {
        if (!isLoggedIn) return "Потрібна авторизація";
        if (mode === 'edit') return "Редагування оголошення";
        return "Нове оголошення";
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <Footer />
            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                title={getModalTitle()}
            >
                {isLoggedIn ? (
                    mode === 'auth' ? null : (
                        <AddItemForm onClose={closeModal} initialData={modalData} />
                    )
                ) : (
                    <div className="text-center py-4 space-y-6">
                        <div className="bg-blue-50 p-4 rounded-2xl">
                            <p className="text-blue-700 text-sm leading-relaxed">
                                {mode === 'auth'
                                    ? "Увійдіть, щоб отримати доступ до вашого профілю."
                                    : "Щоб подати оголошення, будь ласка, увійдіть за допомогою Google."}
                            </p>
                        </div>
                        <GoogleLoginButton />
                    </div>
                )}
            </Modal>
        </div>
    );
}