import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import NoteDetail from './pages/NoteDetail';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/nota/:slug" element={<NoteDetail />} />
            </Routes>
        </AnimatePresence>
    );
};

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-[#050505] text-neutral-100 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden relative">

                {/* BACKGROUND GRID PATTERN - Solo patrón CSS local */}
                <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />

                <Navbar />
                <AnimatedRoutes />
                <Footer />
            </div>
        </Router>
    );
};

export default App;
