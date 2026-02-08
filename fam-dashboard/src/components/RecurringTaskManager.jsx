import React, { useState } from 'react';
import { X, Plus, Trash2, Calendar, Repeat } from 'lucide-react';

const RecurringTaskManager = ({ isOpen, onClose, recurringTasks, onAdd, onDelete }) => {
    const [text, setText] = useState('');
    const [frequency, setFrequency] = useState('daily'); // 'daily' | 'weekly'
    const [selectedDays, setSelectedDays] = useState([]); // 0-6 for weekly

    if (!isOpen) return null;

    const days = [
        { label: 'D', value: 0 },
        { label: 'L', value: 1 },
        { label: 'M', value: 2 },
        { label: 'M', value: 3 },
        { label: 'J', value: 4 },
        { label: 'V', value: 5 },
        { label: 'S', value: 6 },
    ];

    const toggleDay = (dayValue) => {
        if (selectedDays.includes(dayValue)) {
            setSelectedDays(selectedDays.filter(d => d !== dayValue));
        } else {
            setSelectedDays([...selectedDays, dayValue]);
        }
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        // Use the passed onAdd handler from hook
        onAdd(text.trim(), frequency, frequency === 'weekly' ? selectedDays : []);

        setText('');
        setSelectedDays([]);
        setFrequency('daily');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-[#0a0a0a] rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl border border-white/10 h-[85vh] flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-neutral-100 flex items-center">
                        <Repeat className="mr-2 text-orange-500" />
                        Tareas Recurrentes
                    </h2>
                    <button onClick={onClose} className="p-2 text-neutral-500 hover:text-neutral-300 rounded-full hover:bg-white/5">
                        <X size={24} />
                    </button>
                </div>

                {/* Add New Form */}
                <form onSubmit={handleAddSubmit} className="mb-8 p-4 bg-neutral-900/50 rounded-xl border border-white/5">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Nueva rutina (ej: Sacar basura)"
                        className="w-full bg-transparent border-b border-neutral-700 text-white placeholder-neutral-500 py-2 mb-4 focus:outline-none focus:border-orange-500"
                    />

                    <div className="flex gap-2 mb-4">
                        <button
                            type="button"
                            onClick={() => setFrequency('daily')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${frequency === 'daily' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' : 'text-neutral-400 hover:bg-white/5'}`}
                        >
                            Diario
                        </button>
                        <button
                            type="button"
                            onClick={() => setFrequency('weekly')}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${frequency === 'weekly' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/50' : 'text-neutral-400 hover:bg-white/5'}`}
                        >
                            Semanal
                        </button>
                    </div>

                    {frequency === 'weekly' && (
                        <div className="flex justify-between mb-4">
                            {days.map(day => (
                                <button
                                    key={day.value}
                                    type="button"
                                    onClick={() => toggleDay(day.value)}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${selectedDays.includes(day.value)
                                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/50'
                                        : 'bg-neutral-800 text-neutral-500 hover:bg-neutral-700'
                                        }`}
                                >
                                    {day.label}
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!text.trim() || (frequency === 'weekly' && selectedDays.length === 0)}
                        className="w-full bg-neutral-800 hover:bg-neutral-700 text-white py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <Plus size={16} className="mr-2" />
                        Agregar Rutina
                    </button>
                </form>

                {/* List */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                    {recurringTasks.length === 0 ? (
                        <div className="text-center py-10 text-neutral-600">
                            <p>No tienes tareas recurrentes configuradas.</p>
                        </div>
                    ) : (
                        recurringTasks.map(task => (
                            <div key={task.id} className="flex justify-between items-center p-3 bg-neutral-900/30 rounded-lg border border-white/5 group">
                                <div>
                                    <p className="text-neutral-200 font-medium">{task.text}</p>
                                    <p className="text-xs text-neutral-500 flex items-center mt-1">
                                        {task.frequency === 'daily' ? (
                                            <span className="text-orange-400">Todos los días</span>
                                        ) : (
                                            <span>
                                                Semanal: {task.days.map(d => days.find(day => day.value === d)?.label).join(', ')}
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onDelete(task.id)} // Use passed onDelete
                                    className="p-2 text-neutral-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecurringTaskManager;
