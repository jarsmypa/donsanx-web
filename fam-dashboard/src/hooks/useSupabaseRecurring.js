import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const useSupabaseRecurring = () => {
    const [recurringTasks, setRecurringTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch initial items
    useEffect(() => {
        const fetchRecurring = async () => {
            try {
                const { data, error } = await supabase
                    .from('recurring_tasks')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setRecurringTasks(data || []);
            } catch (err) {
                console.error('Error fetching recurring tasks:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecurring();

        // Realtime subscription
        const subscription = supabase
            .channel('public:recurring_tasks')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'recurring_tasks' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setRecurringTasks(prev => [payload.new, ...prev]);
                } else if (payload.eventType === 'UPDATE') {
                    setRecurringTasks(prev => prev.map(task => task.id === payload.new.id ? payload.new : task));
                } else if (payload.eventType === 'DELETE') {
                    setRecurringTasks(prev => prev.filter(task => task.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const addRecurring = async (text, frequency, days = []) => {
        try {
            const newTask = {
                text,
                frequency,
                days,
                // created_at handled by DB
            };

            const { error } = await supabase.from('recurring_tasks').insert([newTask]);
            if (error) throw error;
        } catch (err) {
            console.error('Error adding recurring task:', err);
            setError(err.message);
        }
    };

    // Note: We might need update functionality later, implementing delete for now as per current UI
    const deleteRecurring = async (id) => {
        try {
            const { error } = await supabase.from('recurring_tasks').delete().eq('id', id);
            if (error) throw error;
        } catch (err) {
            console.error('Error deleting recurring task:', err);
            setError(err.message);
        }
    };

    return { recurringTasks, loading, error, addRecurring, deleteRecurring };
};

export default useSupabaseRecurring;
