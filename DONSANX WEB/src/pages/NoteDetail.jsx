import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '../client';

const NoteDetail = () => {
    const { slug } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug === 'demo') {
            // Fake data for demo
            setNote({
                title: "El Caos Digital",
                publishedAt: "2026-01-30",
                headerImage: { asset: { _ref: "img-ref" } }, // Dummy
                body: [
                    { _type: 'block', children: [{ _type: 'span', text: "Este es un contenido de ejemplo. Una vez conectes Sanity y crees tus propias notas, aquí aparecerá tu texto enriquecido." }] },
                    { _type: 'block', children: [{ _type: 'span', text: "Sanity permite subir imágenes, negritas, listas y mucho más." }] }
                ],
                isFallback: true,
                fallbackHeader: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1920"
            });
            setLoading(false);
            return;
        }

        const query = `*[_type == "post" && slug.current == $slug][0] {
            title,
            publishedAt,
            headerImage,
            body
        }`;

        client.fetch(query, { slug })
            .then((data) => {
                setNote(data);
                setLoading(false);
            })
            .catch(console.error);
    }, [slug]);

    if (loading) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">Cargando...</div>;
    if (!note) return <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">Nota no encontrada</div>;

    const ptComponents = {
        types: {
            image: ({ value }) => {
                if (!value?.asset?._ref) {
                    return null;
                }
                return (
                    <img
                        alt={value.alt || ' '}
                        loading="lazy"
                        src={urlFor(value).width(800).fit('max').auto('format').url()}
                        className="my-8 rounded-2xl w-full"
                    />
                )
            }
        }
    }

    return (
        <article className="min-h-screen bg-neutral-950 pb-20">
            {/* Header Image */}
            <div className="h-[50vh] md:h-[60vh] relative w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-950 z-10" />
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={note.isFallback ? note.fallbackHeader : (note.headerImage ? urlFor(note.headerImage).url() : '')}
                    className="w-full h-full object-cover"
                />

                <div className="absolute top-8 left-6 md:left-12 z-20">
                    <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest backdrop-blur-md bg-black/20 px-4 py-2 rounded-full">
                        <ArrowLeft size={16} /> Volver
                    </Link>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="text-orange-500 font-bold text-xs uppercase tracking-[0.4em] mb-4 block">Nota</span>
                        <h1 className="text-4xl md:text-7xl font-black text-white max-w-4xl leading-tight">
                            {note.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-6 md:px-12 mt-12 max-w-3xl">
                <div className="prose prose-invert prose-lg md:prose-xl prose-headings:font-black prose-p:text-neutral-400 prose-a:text-orange-500 prose-img:rounded-3xl">
                    <PortableText value={note.body} components={ptComponents} />
                </div>
            </div>
        </article>
    );
};

export default NoteDetail;
