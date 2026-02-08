import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const useSupabaseTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch initial tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data, error } = await supabase
                    .from('tasks')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setTasks(data || []);
            } catch (err) {
                console.error('Error fetching tasks:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();

        // Realtime subscription
        const subscription = supabase
            .channel('public:tasks')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'tasks' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setTasks(prev => [payload.new, ...prev]);
                } else if (payload.eventType === 'UPDATE') {
                    setTasks(prev => prev.map(task => task.id === payload.new.id ? payload.new : task));
                } else if (payload.eventType === 'DELETE') {
                    setTasks(prev => prev.filter(task => task.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const addTask = async (text, date = new Date(), isRecurring = false) => {
        try {
            const newTask = {
                text,
                completed: false,
                date: date.toISOString(),
                is_recurring: isRecurring,
                // created_at is handled by default in DB
            };

            const { error } = await supabase.from('tasks').insert([newTask]);
            if (error) throw error;
        } catch (err) {
            console.error('Error adding task:', err);
            setError(err.message);
        }
    };

    const toggleTask = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .update({ completed: !currentStatus })
                .eq('id', id);
            if (error) throw error;
        } catch (err) {
            console.error('Error toggling task:', err);
            setError(err.message);
        }
    };

    const updateTaskFields = async (id, updates) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .update(updates)
                .eq('id', id);
            if (error) throw error;
        } catch (err) {
            console.error('Error updating task:', err);
            setError(err.message);
        }
    };

    const deleteTask = async (id) => {
        try {
            const { error } = await supabase.from('tasks').delete().eq('id', id);
            if (error) throw error;
        } catch (err) {
            console.error('Error deleting task:', err);
            setError(err.message);
        }
    };

    return { tasks, loading, error, addTask, toggleTask, deleteTask, updateTaskFields };
};

export default useSupabaseTasks;
