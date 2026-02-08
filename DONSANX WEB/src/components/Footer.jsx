import React from 'react';
import { Instagram, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-24 border-t border-white/5 bg-black/80 backdrop-blur-md relative overflow-hidden">
            <div
                className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
                <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
                    <img src="/assets/logo-white.svg" alt="DONSANX Logo" className="h-6 w-auto" />
                </div>
                <div className="flex gap-10">
                    <a href="#" className="text-neutral-500 hover:text-orange-500 transition-colors">
                        <Instagram size={22} />
                    </a>
                    <a href="#" className="text-neutral-500 hover:text-orange-500 transition-colors">
                        <Linkedin size={22} />
                    </a>
                    <a href="#" className="text-neutral-500 hover:text-orange-500 transition-colors">
                        <Github size={22} />
                    </a>
                </div>
                <div className="text-neutral-600 text-[10px] uppercase font-bold tracking-[0.3em]">
                    © 2026 — DONSANX STUDIO • JUNIOR
                </div>
            </div>
        </footer>
    );
};

export default Footer;
