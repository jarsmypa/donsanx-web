import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Target, Video, Code, X, CheckCircle2, ArrowRight } from 'lucide-react';

const ServiceCard = ({ item, onClick }) => {
    return (
        <motion.div
            layoutId={`card-${item.title}`}
            onClick={() => onClick(item)}
            className={`
                relative group p-8 md:p-10 rounded-[2.5rem] 
                bg-gradient-to-br ${item.gradient}
                flex flex-col justify-between overflow-hidden cursor-pointer
                h-[400px] md:h-[500px] border border-white/10
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Background noise/pattern */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px]" />

            <div className="relative z-10">
                <div className={`p-4 bg-white/10 backdrop-blur-md rounded-2xl w-fit mb-8 text-white`}>
                    {item.icon}
                </div>
            </div>

            <div className="relative z-10">
                <motion.h3
                    layoutId={`title-${item.title}`}
                    className="text-3xl font-black text-white leading-tight mb-2"
                >
                    {item.title}
                </motion.h3>
                <p className="text-white/70 font-medium text-sm">
                    {item.shortDesc}
                </p>
            </div>

            <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="p-3 bg-white text-black rounded-full">
                    <ArrowRight size={20} />
                </div>
            </div>
        </motion.div>
    );
};

const ServiceDetail = ({ item, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                layoutId={`card-${item.title}`}
                className={`
                    w-full max-w-4xl bg-gradient-to-br ${item.gradient}
                    rounded-[2.5rem] overflow-hidden relative shadow-2xl
                    flex flex-col md:flex-row
                `}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-6 right-6 z-50">
                    <button
                        onClick={onClose}
                        className="p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors backdrop-blur-md"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Left side: Icon & Title */}
                <div className="p-10 md:p-14 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:20px_20px]" />

                    <div className="relative z-10">
                        <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl w-fit mb-8 text-white">
                            {React.cloneElement(item.icon, { size: 40 })}
                        </div>
                        <motion.h3
                            layoutId={`title-${item.title}`}
                            className="text-4xl md:text-5xl font-black text-white leading-none"
                        >
                            {item.title}
                        </motion.h3>
                    </div>

                    <div className="relative z-10 mt-10 md:mt-0">
                        <div className="h-1 w-20 bg-white/30 rounded-full" />
                    </div>
                </div>

                {/* Right side: Content */}
                <div className="p-10 md:p-14 md:w-3/5 bg-black/20 backdrop-blur-sm">
                    <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-white" />
                        Capacidades
                    </h4>

                    <div className="space-y-4 mb-10">
                        {item.features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3"
                            >
                                <CheckCircle2 className="w-5 h-5 text-white/60 mt-0.5 shrink-0" />
                                <div>
                                    <strong className="text-white block text-lg">{feature.name}</strong>
                                    <span className="text-white/60 text-sm">{feature.desc}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <p className="text-white/80 leading-relaxed border-t border-white/10 pt-6">
                        {item.description}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            title: 'Diseño Visual',
            shortDesc: 'Identidad que impacta.',
            icon: <Palette className="w-8 h-8" />,
            gradient: 'from-pink-600 to-rose-900',
            features: [
                { name: 'Branding & Identidad', desc: 'Logotipos, manuales, sistemas visuales y materiales gráficos.' },
                { name: 'Diseño UI/UX', desc: 'Interfaces intuitivas y experiencias de usuario memorables.' },
                { name: 'Dirección de Arte', desc: 'Conceptos visuales unificados para campañas.' }
            ],
            description: 'Transformamos conceptos abstractos en lenguajes visuales tangibles. Nuestro enfoque en diseño no es solo estético, sino estratégico, asegurando que cada pixel comunique la esencia de tu marca.'
        },
        {
            title: 'Marketing Digital',
            shortDesc: 'Estrategias de crecimiento.',
            icon: <Target className="w-8 h-8" />,
            gradient: 'from-orange-500 to-amber-900',
            features: [
                { name: 'Social Media Strategy', desc: 'Gestión y curaduría de contenido para redes.' },
                { name: 'Performance Marketing', desc: 'Campañas de anuncios optimizadas (Meta/Google Ads).' },
                { name: 'Growth Hacking', desc: 'Estrategias experimentales para crecimiento rápido.' }
            ],
            description: 'No solo publicamos, conectamos. Desarrollamos ecosistemas digitales que fomentan la interacción y convierten seguidores en embajadores de marca mediante datos y creatividad.'
        },
        {
            title: 'Edición Video',
            shortDesc: 'Narrativa en movimiento.',
            icon: <Video className="w-8 h-8" />,
            gradient: 'from-red-600 to-purple-900',
            features: [
                { name: 'Guionización & Storytelling', desc: 'Desarrollo de guiones creativos y narrativa audiovisual.' },
                { name: 'Edición Comercial', desc: 'Cortes dinámicos para publicidad de alto impacto.' },
                { name: 'Color Grading', desc: 'Corrección de color cinematográfica.' }
            ],
            description: 'El video es el rey del contenido. Producimos piezas audiovisuales que detienen el scroll, combinando ritmo, sonido e imagen para contar historias que resuenan emocionalmente.'
        },
        {
            title: 'Desarrollo Web',
            shortDesc: 'Código con propósito.',
            icon: <Code className="w-8 h-8" />,
            gradient: 'from-blue-600 to-indigo-900',
            features: [
                { name: 'Landing Pages', desc: 'Páginas de alto impacto optimizadas para conversión.' },
                { name: 'Presencia de Marca', desc: 'Sitios corporativos que reflejan autoridad y confianza.' },
                { name: 'Experiencias Digitales', desc: 'Desarrollo web enfocado en la narrativa de marca.' }
            ],
            description: 'Construimos la infraestructura de tu negocio digital. Sitios rápidos, seguros y diseñados para convertir visitas en clientes, utilizando las últimas tecnologías del mercado.'
        },
    ];

    return (
        <section id="servicios" className="py-32 relative overflow-hidden bg-neutral-950">
            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-24">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic mb-4 text-white">
                        CAPACIDADES <br />
                        <span className="text-stroke-white text-transparent opacity-80">TÉCNICAS.</span>
                    </h2>
                    <p className="max-w-md text-neutral-400 font-medium text-lg border-l-2 border-pink-500 pl-6">
                        Elevando la percepción de tu marca a través de un enfoque multidisciplinar y vanguardista.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, idx) => (
                        <ServiceCard
                            key={idx}
                            item={service}
                            onClick={setSelectedService}
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedService && (
                    <ServiceDetail
                        item={selectedService}
                        onClose={() => setSelectedService(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Services;
