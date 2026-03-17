import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Modal from '../common/Modal';
import AddItemForm from '../items/AddItemForm';
import { useModalStore } from '../../store/useModalStore';

export default function MainLayout() {
    const { isOpen, closeModal } = useModalStore();
    return (
        <div className="flex flex-col min-h-screen">

            <Header />


            <main className="flex-grow container mx-auto px-6 py-8">
                <Outlet />
            </main>


            <Footer />

            <Modal isOpen={isOpen} onClose={closeModal} title="Нове оголошення">
                <AddItemForm onClose={closeModal} />
            </Modal>
        </div>
    );
}