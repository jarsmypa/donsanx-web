import React from 'react';
import { Trash2, CheckCircle, Circle, Repeat } from 'lucide-react';

const TaskList = ({ tasks, onToggle, onDelete }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-8 text-gray-400">
                <p>No hay tareas pendientes</p>
            </div>
        );
    }

    return (
        <div className="space-y-3 px-4 mb-8">
            <h2 className="text-sm font-medium text-neutral-500 uppercase tracking-wider mb-3 ml-1">Tareas</h2>
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className={`relative flex items-center justify-between p-4 rounded-2xl border transition-all ${task.completed
                        ? 'bg-neutral-900/50 border-neutral-900 opacity-60'
                        : task.isRecurring
                            ? 'bg-neutral-800/80 border-orange-500/30 hover:border-orange-500/50 shadow-lg shadow-orange-900/10'
                            : 'bg-secondary border-white/5 hover:border-white/10'
                        }`}
                >
                    {/* Recurring Indicator Strip */}
                    {task.isRecurring && !task.completed && (
                        <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-1 h-[60%] bg-orange-500 rounded-r-full shadow-[0_0_8px_rgba(249,115,22,0.4)]"></div>
                    )}

                    <button
                        onClick={() => onToggle(task.id)}
                        className="flex items-center flex-1 text-left group pl-1"
                    >
                        <span className={`mr-4 flex-shrink-0 transition-colors ${task.completed ? 'text-green-500' : 'text-neutral-600 group-hover:text-primary'}`}>
                            {task.completed ? <CheckCircle size={22} className="text-primary" /> : <Circle size={22} />}
                        </span>

                        <div className="flex flex-col">
                            <span className={`text-base font-medium transition-all ${task.completed ? 'text-neutral-500 line-through decoration-neutral-700' : 'text-neutral-200'}`}>
                                {task.text}
                            </span>

                            {/* Recurring Badge */}
                            {task.isRecurring && (
                                <span className="text-[10px] text-orange-400/80 uppercase tracking-wider font-bold flex items-center mt-0.5">
                                    <Repeat size={10} className="mr-1" />
                                    Rutina
                                </span>
                            )}
                        </div>
                    </button>

                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-neutral-600 hover:text-red-400 p-2 transition-colors ml-2"
                        aria-label="Eliminar tarea"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
