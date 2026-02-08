import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    // Helper to handle navigation: Scroll if on home, or just go to home#hash if elsewhere
    const getLinkHref = (item) => {
        const hash = `#${item.toLowerCase().replace(' ', ' -')}`;
        return isHome ? hash : `/${hash}`; // Simple heuristic, better to use HashLink for robustness but this works for basic cases
    };

    return (
        <>
            <nav className="fixed w-full z-[100] top-0 left-0 flex justify-center p-4 md:p-6 pointer-events-none">
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className={` pointer-events-auto
                    flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ease-in-out border
                    ${scrolled
                            ? 'w-full md:w-[90%] lg:w-[70%] bg-black/60 backdrop-blur-xl border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]'
                            : 'w-full bg-transparent border-transparent'} `}
                >
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/assets/logo-white.svg" alt="DONSANX Logo" className="h-8 w-auto" />
                    </Link>

                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            to="/about"
                            className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors relative group
                                ${location.pathname === '/about' ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                        >
                            Sobre mí
                            <span className={`absolute bottom-0 left-4 right-4 h-[1px] bg-orange-500 transition-transform origin-left
                                ${location.pathname === '/about' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                        </Link>

                        {['Servicios', 'Portfolio', 'Notas'].map((item) => (
                            <a key={item} href={isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`}
                                className="px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 hover:text-white transition-colors relative group">
                                {item}
                                <span
                                    className="absolute bottom-0 left-4 right-4 h-[1px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                            </a>
                        ))}
                        <a href="https://wa.me/595994899016" target="_blank" rel="noopener noreferrer"
                            className="px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 hover:text-white transition-colors relative group">
                            Contacto
                            <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://wa.me/595994899016" target="_blank"
                            className="hidden md:block px-6 py-2 bg-orange-500 text-black text-[10px] font-black rounded-full uppercase tracking-widest">
                            Contratar
                        </motion.a>
                        <button className="md:hidden p-2 text-white pointer-events-auto" onClick={() =>
                            setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ?
                                <X /> :
                                <Menu />}
                        </button>
                    </div>
                </motion.div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-[90] flex flex-col items-center justify-center gap-8">
                        <button className="absolute top-8 right-8 text-white" onClick={() => setIsMenuOpen(false)}>
                            <X size={32} />
                        </button>

                        <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black italic text-white hover:text-orange-500 transition-colors">
                            Sobre mí
                        </Link>

                        {['Servicios', 'Portfolio', 'Notas'].map((item, i) => (
                            <a key={item} href={isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}
                                className="text-4xl font-black italic text-white hover:text-orange-500 transition-colors">
                                {item}
                            </a>
                        ))}
                        <a href="https://wa.me/595994899016" target="_blank" onClick={() => setIsMenuOpen(false)}
                            className="text-4xl font-black italic text-white hover:text-orange-500 transition-colors">
                            Contacto
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
