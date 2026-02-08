import React from 'react';
import { Plus } from 'lucide-react';

const FloatingActionButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-opacity-90 transition-all hover:scale-105 active:scale-95 z-50"
            aria-label="Agregar tarea"
        >
            <Plus size={28} />
        </button>
    );
};

export default FloatingActionButton;
