
import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Calendar as CalendarIcon } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';

const AddItemModal = ({ isOpen, onClose, onAdd }) => {
    const [text, setText] = useState('');
    const [type, setType] = useState('task'); // 'task' or 'shopping'
    const [selectedDateOffset, setSelectedDateOffset] = useState(0); // 0 = hoy, 1 = mañana, etc.
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        if (!isOpen) {
            setText('');
            setType('task');
            setSelectedDateOffset(0);
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            const date = addDays(new Date(), selectedDateOffset);
            onAdd(type, text.trim(), date);
            setText('');
        }
    };

    const dateOptions = [
        { label: 'Hoy', value: 0 },
        { label: 'Mañana', value: 1 },
        { label: 'Pasado', value: 2 },
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-[#0a0a0a] rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl border border-white/10 transform transition-transform animate-in slide-in-from-bottom duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-neutral-100">Nuevo Item</h2>
                    <button onClick={onClose} className="p-2 text-neutral-500 hover:text-neutral-300 rounded-full hover:bg-white/5">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Type Selector */}
                    <div className="flex p-1 bg-secondary rounded-xl border border-white/5">
                        <button
                            type="button"
                            onClick={() => setType('task')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${type === 'task'
                                ? 'bg-neutral-800 text-primary shadow-sm border border-white/5'
                                : 'text-neutral-500 hover:text-neutral-300'
                                }`}
                        >
                            Tarea
                        </button>
                        <button
                            type="button"
                            onClick={() => setType('shopping')}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${type === 'shopping'
                                ? 'bg-neutral-800 text-orange-400 shadow-sm border border-white/5'
                                : 'text-neutral-500 hover:text-neutral-300'
                                }`}
                        >
                            Compras
                        </button>
                    </div>

                    {/* Input */}
                    <div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={type === 'task' ? "¿Qué hay que hacer?" : "¿Qué falta comprar?"}
                            className="w-full text-lg border-b-2 border-neutral-800 focus:border-primary px-0 py-2 outline-none transition-colors bg-transparent text-white placeholder-neutral-600"
                        />
                    </div>

                    {/* Date Selector (Only for Tasks) */}
                    {type === 'task' && (
                        <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
                            {dateOptions.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => setSelectedDateOffset(option.value)}
                                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedDateOffset === option.value
                                        ? 'bg-primary/10 border-primary text-primary'
                                        : 'bg-secondary border-white/5 text-neutral-400 hover:bg-neutral-800'
                                        }`}
                                >
                                    <CalendarIcon size={14} className="mr-2" />
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-orange-900/20"
                    >
                        <Check size={20} className="mr-2" />
                        Agregar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItemModal;

