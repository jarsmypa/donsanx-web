import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const useSupabaseShopping = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch initial items
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data, error } = await supabase
                    .from('shopping_items')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setItems(data || []);
            } catch (err) {
                console.error('Error fetching shopping items:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();

        // Realtime subscription
        const subscription = supabase
            .channel('public:shopping_items')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'shopping_items' }, (payload) => {
                if (payload.eventType === 'INSERT') {
                    setItems(prev => [payload.new, ...prev]);
                } else if (payload.eventType === 'UPDATE') {
                    setItems(prev => prev.map(item => item.id === payload.new.id ? payload.new : item));
                } else if (payload.eventType === 'DELETE') {
                    setItems(prev => prev.filter(item => item.id !== payload.old.id));
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    const addItem = async (text) => {
        try {
            const newItem = {
                text,
                completed: false,
                // created_at handled by DB
            };

            const { error } = await supabase.from('shopping_items').insert([newItem]);
            if (error) throw error;
        } catch (err) {
            console.error('Error adding shopping item:', err);
            setError(err.message);
        }
    };

    const toggleItem = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('shopping_items')
                .update({ completed: !currentStatus })
                .eq('id', id);
            if (error) throw error;
        } catch (err) {
            console.error('Error toggling shopping item:', err);
            setError(err.message);
        }
    };

    const deleteItem = async (id) => {
        try {
            const { error } = await supabase.from('shopping_items').delete().eq('id', id);
            if (error) throw error;
        } catch (err) {
            console.error('Error deleting shopping item:', err);
            setError(err.message);
        }
    };

    return { items, loading, error, addItem, toggleItem, deleteItem };
};

export default useSupabaseShopping;
