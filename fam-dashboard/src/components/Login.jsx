import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import logo from '../assets/logo-white.svg';

const Login = ({ onLogin }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    // Fetch users (profiles) from Supabase
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('id, name, pin')
                    .order('name');

                if (error) throw error;
                // If no users found (e.g. before running SQL), provide defaults or handle gracefully
                if (!data || data.length === 0) {
                    // Fallback for dev/first run if SQL hasn't run yet
                    setUsers([
                        { id: '1', name: 'Junior', pin: '1234' },
                        { id: '2', name: 'Tamara', pin: '5678' }
                    ]);
                } else {
                    setUsers(data);
                }
            } catch (err) {
                console.error('Error fetching profiles:', err);
                // Fallback
                setUsers([
                    { id: '1', name: 'Junior', pin: '1234' },
                    { id: '2', name: 'Tamara', pin: '5678' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handlePinChange = (e) => {
        const value = e.target.value;
        const requiredLength = selectedUser.pin.length;

        if (value.length <= requiredLength && /^\d*$/.test(value)) {
            setPin(value);
            setError('');

            if (value.length === requiredLength) {
                handleLogin(value);
            }
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
        setPin('');
        setError('');
    };

    const handleLogin = (enteredPin) => {
        if (enteredPin === selectedUser.pin) {
            onLogin(selectedUser.name); // Pass just the name or full object
        } else {
            setError('PIN Incorrecto');
            setPin('');
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">Cargando...</div>;
    }

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />

            <div className="w-full max-w-md z-10 flex flex-col items-center">

                <div className="mb-12 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <img src={logo} alt="Logo" className="h-12 mb-6 opacity-90" />
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200 tracking-tight">
                        Family OS
                    </h1>
                </div>

                {!selectedUser ? (
                    <div className="w-full space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                        <p className="text-neutral-500 text-center mb-6 text-sm uppercase tracking-widest font-medium">¿Quién eres?</p>
                        <div className="grid grid-cols-2 gap-4">
                            {users.map((user) => (
                                <button
                                    key={user.id}
                                    onClick={() => handleUserSelect(user)}
                                    className="aspect-square rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-orange-500/50 hover:bg-neutral-800 transition-all group flex flex-col items-center justify-center gap-3"
                                >
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center border border-white/5 group-hover:border-orange-500/30 shadow-lg">
                                        <span className="text-2xl font-bold text-neutral-300 group-hover:text-orange-400">
                                            {user.name.charAt(0)}
                                        </span>
                                    </div>
                                    <span className="text-neutral-400 font-medium group-hover:text-white">{user.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    // PIN Entry View
                    <div className="w-full max-w-xs animate-in fade-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="mb-8 text-neutral-500 hover:text-white text-sm flex items-center justify-center transition-colors"
                        >
                            ← Volver
                        </button>

                        <div className="text-center mb-8">
                            <h2 className="text-xl text-neutral-200 font-medium mb-2">Hola, {selectedUser.name}</h2>
                            <p className="text-neutral-500 text-sm">Ingresa tu PIN de acceso</p>
                        </div>

                        <div className="bg-neutral-900/30 p-8 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-sm">
                            <input
                                type="password"
                                value={pin}
                                onChange={handlePinChange}
                                className="w-full bg-transparent text-center text-4xl font-bold text-white tracking-[0.5em] focus:outline-none mb-2 placeholder-neutral-800"
                                placeholder={"•".repeat(selectedUser.pin.length)}
                                autoFocus
                            />
                            {error && (
                                <p className="text-red-400 text-xs text-center mt-4 font-medium animate-pulse">{error}</p>
                            )}
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-neutral-600 text-xs">PIN por defecto: 1234 / 5678</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
