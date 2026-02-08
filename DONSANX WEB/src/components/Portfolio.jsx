import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../portfolio/data';
import { X, ArrowRight, Maximize2 } from 'lucide-react';

const PortfolioItem = ({ item, onClick, isSlider = false }) => {
    return (
        <motion.div
            layoutId={`card-${item.id}`}
            onClick={() => onClick(item)}
            className={`group relative overflow-hidden cursor-pointer bg-neutral-900 border border-white/5 ${isSlider
                ? 'min-w-[280px] md:min-w-[360px] h-[400px] md:h-[500px] rounded-3xl'
                : 'w-full aspect-[4/5] rounded-[2rem]'
                }`}
            whileHover={{ y: -10 }}
        >
            <motion.img
                layoutId={`image-${item.id}`}
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                loading="lazy"
                decoding="async"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <motion.span
                    layoutId={`category-${item.id}`}
                    className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-2"
                >
                    {item.category}
                </motion.span>
                <motion.h3
                    layoutId={`title-${item.id}`}
                    className={`font-black text-white leading-none group-hover:text-orange-50 transition-colors ${isSlider ? 'text-2xl' : 'text-xl md:text-2xl'
                        }`}
                >
                    {item.title}
                </motion.h3>
                <div className="mt-4 flex items-center text-xs font-medium text-neutral-400 group-hover:text-white transition-colors">
                    <Maximize2 className="w-3 h-3 mr-2" />
                    <span>Ver Proyecto</span>
                </div>
            </div>
        </motion.div>
    );
};

const ProjectModal = ({ item, onClose }) => {
    if (!item) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                layoutId={`card-${item.id}`}
                className="bg-neutral-900 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] relative border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 p-3 bg-black/50 hover:bg-orange-500 rounded-full text-white transition-colors backdrop-blur-md"
                >
                    <X size={24} />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                    <div className="h-[40vh] md:h-[80vh] relative bg-neutral-800">
                        <motion.img
                            layoutId={`image-${item.id}`}
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 to-transparent" />
                    </div>

                    <div className="p-8 md:p-12 flex flex-col justify-center bg-neutral-900">
                        <motion.span
                            layoutId={`category-${item.id}`}
                            className="text-orange-500 font-bold text-sm uppercase tracking-[0.2em] mb-4"
                        >
                            {item.category}
                        </motion.span>
                        <motion.h2
                            layoutId={`title-${item.id}`}
                            className="text-4xl md:text-6xl font-black text-white leading-[0.9] mb-8"
                        >
                            {item.title}
                        </motion.h2>

                        <p className="text-neutral-300 text-lg leading-relaxed mb-8 border-l-2 border-orange-500 pl-6">
                            {item.description}
                        </p>

                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-orange-500 rounded-full text-white font-bold hover:bg-orange-600 transition-colors uppercase tracking-wider text-sm">
                                Ver Proyecto
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Portfolio = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [viewMode, setViewMode] = useState('slider'); // 'slider' or 'gallery'
    const sliderRef = useRef(null);

    return (
        <section id="portfolio" className="py-32 relative bg-neutral-950 overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic mb-4 text-white">
                            PROYECTOS <br />
                            <span className="text-stroke-white text-transparent">DESTACADOS.</span>
                        </h2>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setViewMode('slider')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${viewMode === 'slider' ? 'bg-orange-500 text-white' : 'text-neutral-400 hover:text-white'
                                }`}
                        >
                            Carrusel
                        </button>
                        <button
                            onClick={() => setViewMode('gallery')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${viewMode === 'gallery' ? 'bg-orange-500 text-white' : 'text-neutral-400 hover:text-white'
                                }`}
                        >
                            Galería
                        </button>
                    </div>
                </div>

                {/* Slider View */}
                {viewMode === 'slider' && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="relative"
                    >
                        <div
                            ref={sliderRef}
                            className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            onMouseDown={(e) => {
                                const slider = sliderRef.current;
                                slider.isDown = true;
                                slider.startX = e.pageX - slider.offsetLeft;
                                slider.scrollLeftStart = slider.scrollLeft;
                                slider.itemsDragged = false; // Reset drag state
                            }}
                            onMouseLeave={() => {
                                if (sliderRef.current) sliderRef.current.isDown = false;
                            }}
                            onMouseUp={() => {
                                if (sliderRef.current) sliderRef.current.isDown = false;
                            }}
                            onMouseMove={(e) => {
                                const slider = sliderRef.current;
                                if (!slider || !slider.isDown) return;
                                e.preventDefault();
                                const x = e.pageX - slider.offsetLeft;
                                const walk = (x - slider.startX) * 2; // Scroll speed
                                slider.scrollLeft = slider.scrollLeftStart - walk;

                                // Mark as dragged if moved more than 5px
                                if (Math.abs(x - slider.startX) > 5) {
                                    slider.itemsDragged = true;
                                }
                            }}
                        >
                            {portfolioData.map((item) => (
                                <div key={item.id} className="snap-center shrink-0 pointer-events-none md:pointer-events-auto">
                                    <div className="pointer-events-auto" onClickCapture={(e) => {
                                        // Capture click event and stop it if we dragged
                                        if (sliderRef.current?.itemsDragged) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }
                                    }}>
                                        <PortfolioItem
                                            item={item}
                                            isSlider={true}
                                            onClick={(item) => {
                                                // Double check preventing opening
                                                if (!sliderRef.current?.itemsDragged) {
                                                    setSelectedItem(item);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="shrink-0 w-12" /> {/* Right padding */}
                        </div>

                        {/* Scroll hint gradient */}
                        <div className="absolute right-0 top-0 bottom-12 w-32 bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none" />
                    </motion.div>
                )}

                {/* Gallery View */}
                {viewMode === 'gallery' && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    >
                        {portfolioData.map((item) => (
                            <PortfolioItem
                                key={item.id}
                                item={item}
                                onClick={setSelectedItem}
                            />
                        ))}
                    </motion.div>
                )}

                <div className="mt-12 flex justify-center">
                    {viewMode === 'slider' && (
                        <button
                            onClick={() => setViewMode('gallery')}
                            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-neutral-800 text-white font-medium hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Ver Todos
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <ProjectModal
                        item={selectedItem}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Portfolio;
