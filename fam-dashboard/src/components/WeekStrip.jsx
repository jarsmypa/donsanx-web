import React, { useRef, useEffect } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

const WeekStrip = ({ selectedDate, onSelectDate }) => {
    const scrollRef = useRef(null);
    const today = new Date();
    // Start from today - 2 days to show some context
    const startDate = addDays(today, -2);
    const days = Array.from({ length: 14 }, (_, i) => addDays(startDate, i));

    useEffect(() => {
        if (scrollRef.current) {
            // Center selected date logic could go here
        }
    }, [selectedDate]);

    return (
        <div className="overflow-x-auto pb-4 px-4 no-scrollbar" ref={scrollRef}>
            <div className="flex space-x-3">
                {days.map((date) => {
                    const isSelected = isSameDay(date, selectedDate);
                    const isToday = isSameDay(date, today);

                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => onSelectDate(date)}
                            className={`flex flex-col items-center justify-center min-w-[3.5rem] h-16 rounded-2xl transition-all border ${isSelected
                                    ? 'bg-primary border-primary text-white shadow-lg shadow-orange-900/20'
                                    : 'bg-secondary border-white/5 text-neutral-400 hover:bg-neutral-800'
                                }`}
                        >
                            <span className="text-xs font-medium uppercase">
                                {format(date, 'EEE', { locale: es }).replace('.', '')}
                            </span>
                            <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-neutral-200'}`}>
                                {format(date, 'd')}
                            </span>
                            {isToday && !isSelected && (
                                <div className="w-1 h-1 rounded-full bg-primary mt-1" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default WeekStrip;
