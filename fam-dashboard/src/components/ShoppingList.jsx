import React from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';

const ShoppingList = ({ items, onToggle, onDelete }) => {
    if (items.length === 0) {
        return (
            <div className="text-center py-8 text-neutral-600 border border-dashed border-neutral-800 rounded-xl mx-4">
                <ShoppingCart className="mx-auto mb-2 opacity-50" size={24} />
                <p>Lista de compras vacía</p>
            </div>
        );
    }

    return (
        <div className="space-y-2 px-4 mb-24">
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-2 ml-1 flex items-center">
                <ShoppingCart className="mr-2" size={16} />
                Lista de Compras
            </h2>
            <div className="bg-secondary rounded-2xl p-4 border border-white/5">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                    >
                        <button
                            onClick={() => onToggle(item.id)}
                            className="flex items-center flex-1 text-left group"
                        >
                            <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center transition-colors ${item.completed ? 'bg-orange-500 border-orange-500' : 'border-neutral-600 bg-transparent group-hover:border-primary'
                                }`}>
                                {item.completed && <span className="text-white text-xs font-bold">✓</span>}
                            </div>
                            <span className={`text-base ${item.completed ? 'text-neutral-500 line-through' : 'text-neutral-200'}`}>
                                {item.text}
                            </span>
                        </button>

                        <button
                            onClick={() => onDelete(item.id)}
                            className="text-neutral-600 hover:text-orange-500 p-2 transition-colors ml-2"
                            aria-label="Eliminar item"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShoppingList;
