import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";

function App() {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/item/:id" element={<ItemPage/>}/>
                    <Route path="*" element={<div>Сторінку не знайдено</div>}/>
                </Route>

            </Routes>
        </Router>
    )
}

export default App
