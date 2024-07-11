import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Search } from './Pages/Search';
import { Watch } from './Pages/Watch';
import { initializeAdBlocker } from './utils/adBlocker'; 

function App() {
    useEffect(() => {
        initializeAdBlocker(); // Initialize ad blocker on component mount
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/watch/:id' element={<Watch />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
