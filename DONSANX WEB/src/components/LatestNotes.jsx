import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { client, urlFor } from '../client';

const LatestNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = `*[_type == "post"] | order(publishedAt desc)[0...2] {
            _id,
            title,
            slug,
            tag,
            publishedAt,
            mainImage
        }`;

        client.fetch(query)
            .then((data) => {
                setNotes(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Sanity fetch error:", error);
                // Fallback for demo/dev if Sanity isn't configured yet
                setNotes([
                    {
                        _id: 1,
                        title: "El Caos Digital",
                        tag: "Reflexión",
                        publishedAt: "2026-01-30",
                        mainImage: { asset: { _ref: "image-tb-1" } }, // Dummy ref
                        isFallback: true,
                        fallbackImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200"
                    },
                    {
                        _id: 2,
                        title: "La Estética del Ruido",
                        tag: "Ensayo",
                        publishedAt: "2026-01-28",
                        mainImage: { asset: { _ref: "image-tb-2" } },
                        isFallback: true,
                        fallbackImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"
                    }
                ]);
                setLoading(false);
            });
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <section id="notas" className="py-32 relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-20">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic mb-4">
                        ÚLTIMAS <br />
                        <span className="text-neutral-800 underline decoration-orange-500/50">NOTAS.</span>
                    </h2>
                    <p className="max-w-xs text-neutral-500 font-medium text-sm">Escritos, reflexiones y pensamientos sobre diseño y tecnología.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                    {notes.map((note) => (
                        <motion.div key={note._id} whileHover={{ y: -20 }}
                            className="group relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-neutral-900 aspect-[16/11] cursor-pointer border border-white/5 mx-auto w-full">
                            <Link to={`/nota/${note.slug?.current || 'demo'}`}>
                                <img
                                    src={note.isFallback ? note.fallbackImage : urlFor(note.mainImage).width(800).url()}
                                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                                    alt={note.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                                <div className="absolute inset-0 p-12 flex flex-col justify-end">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-orange-500 font-bold text-xs uppercase tracking-[0.4em]">{note.tag || 'Blog'}</span>
                                        <span className="text-neutral-500 font-bold text-xs uppercase tracking-[0.2em]">{formatDate(note.publishedAt)}</span>
                                    </div>
                                    <h3 className="text-4xl font-black text-white leading-none">{note.title}</h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestNotes;
