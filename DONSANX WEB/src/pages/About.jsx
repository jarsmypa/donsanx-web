import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, User, Zap } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-32 pb-20 px-6 container mx-auto relative min-h-screen flex flex-col justify-center">

            {/* Background Elements */}
            <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full -z-10 animate-pulse" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
            >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.3em] uppercase text-orange-400 mb-8 backdrop-blur-sm">
                    <User className="w-3 h-3 fill-orange-400" /> Sobre mí
                </span>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">
                    CREATIVIDAD <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-500 to-neutral-800">CAÓTICA.</span>
                </h1>

                <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
                    <p className="text-xl md:text-2xl text-neutral-300 font-medium leading-relaxed">
                        Soy Junior. Más que un diseñador, soy un arquitecto de marcas. Un Creative Lead que fusiona la estética con estrategia publicitaria para construir narrativas que no se pueden ignorar.
                    </p>
                    <div className="space-y-6 text-neutral-500 leading-relaxed text-sm">
                        <p>
                            Romper el molde es solo el principio.
                        </p>
                        <p>
                            Mi filosofía se basa en "deconstruir para evolucionar". Creo que el diseño sin estrategia es solo decoración. DONSANX es mi manifiesto digital: un espacio donde la funcionalidad se encuentra con la emoción cruda.
                        </p>
                        <p>
                            Con una sólida trayectoria en publicidad y dirección de arte, no solo hago que tu marca se vea bien; hago que se sienta relevante. Uso la psicología del color, la composición y una narrativa afilada para ayudar a las marcas a encontrar su voz auténtica en un mercado saturado de ruido.
                        </p>
                        <p className="text-neutral-300 font-bold">
                            Si buscas seguridad, sigue buscando. Si buscas impacto, hablemos.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
                    {[
                        { number: "+8", label: "Años Creando Valor" },
                        { number: "+50", label: "Proyectos Exitosos" },
                        { number: "100%", label: "Visión Estratégica" },
                        { number: "∞", label: "Creatividad Sin Límites" }
                    ].map((stat, i) => (
                        <div key={i} className="p-6 border border-white/5 rounded-3xl bg-white/[0.02]">
                            <div className="text-4xl font-black text-white mb-2">{stat.number}</div>
                            <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <motion.a
                    href="https://wa.me/595994899016"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="p-12 rounded-[3rem] bg-gradient-to-br from-orange-500 to-red-600 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 group cursor-pointer block"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                    <div className="relative z-10">
                        <h3 className="text-3xl font-black text-white mb-2">¿Listo para romper el molde?</h3>
                        <p className="text-white/80 font-medium">Hablemos de tu próximo gran proyecto.</p>
                    </div>

                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center relative z-10 group-hover:rotate-45 transition-transform duration-500">
                        <ArrowRight className="text-orange-600 w-6 h-6" />
                    </div>
                </motion.a>

            </motion.div>
        </div>
    );
};

export default About;
