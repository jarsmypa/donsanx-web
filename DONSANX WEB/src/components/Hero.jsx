import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';

const Hero = () => {
    // Valores para el Halo interactivo
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Suavizado del movimiento
    const springConfig = { damping: 25, stiffness: 700 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Calcular posición relativa al centro
        const xPos = clientX - innerWidth / 2;
        const yPos = clientY - innerHeight / 2;

        mouseX.set(xPos);
        mouseY.set(yPos);
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
            onMouseMove={handleMouseMove}
        >

            {/* BACKGROUND NOISE & GRADIENTS */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-900 rounded-full blur-[100px] opacity-50" />

                {/* HALO INTERACTIVO */}
                <motion.div
                    style={{ x, y }}
                    className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 bg-orange-600/20 rounded-full blur-[80px] mix-blend-screen pointer-events-none"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 flex justify-center"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.3em] uppercase text-orange-500 backdrop-blur-sm">
                        <Zap size={10} fill="currentColor" /> CREATIVIDAD DISRUPTIVA
                    </span>
                </motion.div>

                <h1 className="text-5xl md:text-9xl font-black tracking-tighter leading-none mb-6 mix-blend-difference">
                    DONSANX <br />
                    <span className="text-neutral-500">STUDIO.</span>
                </h1>

                <p className="text-neutral-500 max-w-lg mx-auto mb-10 text-sm md:text-base font-medium">
                    Transformando el caos en sistemas de diseño coherentes.
                    <span className="text-white"> Experiencias digitales que no piden permiso.</span>
                </p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col md:flex-row items-center justify-center gap-6"
                >

                    <a href="#portfolio" className="text-neutral-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                        Explorar trabajos <ArrowRight size={14} />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
