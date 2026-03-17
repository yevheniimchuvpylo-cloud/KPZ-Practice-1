export default function Footer() {
    return (
        <footer className="mt-auto py-8 border-t border-gray-100 bg-gray-50/50">
            <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} Бюро знахідок. Розроблено для практичної роботи.</p>
                <p className="mt-2 text-gray-400">Допомога • Контакти • Правила</p>
            </div>
        </footer>
    );
}