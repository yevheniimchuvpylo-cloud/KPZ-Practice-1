import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home/>}/>
                    <Route path="/item/:id" element={<ItemPage/>}/>
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<div>Сторінку не знайдено</div>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default App;