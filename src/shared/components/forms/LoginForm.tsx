import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../../app/store/store.ts";
import { loginAsync } from "../../../app/store/slice/authSlice.ts";
import clsx from 'clsx';

const LoginForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginAsync({ email, password }));
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
            <h2 className="text-2xl font-semibold text-text text-center">Accedi</h2>

            {/* Campo Email */}
            <div>
                <label className="block text-sm font-medium text-textSoft">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={clsx(
                        'mt-2 w-full rounded-lg border border-border p-3 bg-secondary text-text',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                    )}
                />
            </div>

            {/* Campo Password */}
            <div>
                <label className="block text-sm font-medium text-textSoft">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={clsx(
                        'mt-2 w-full rounded-lg border border-border p-3 bg-secondary text-text',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                    )}
                />
            </div>

            {/* Messaggio di errore */}
            {error && (
                <div className="text-red-500 text-sm p-2 rounded bg-red-100 dark:bg-red-900 dark:text-red-300">
                    {error}
                </div>
            )}

            {/* Bottone Login */}
            <button
                type="submit"
                disabled={isLoading}
                className={clsx(
                    'w-full py-3 rounded-lg text-white text-lg font-medium transition-colors',
                    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-accent'
                )}
            >
                {isLoading ? 'Caricamento...' : 'Accedi'}
            </button>

            {/* Link per password dimenticata */}
            <div className="text-center text-sm mt-2">
                <a href="/forgot-password" className="text-primary hover:underline">
                    Password dimenticata?
                </a>
            </div>
        </form>
    );
};

export default LoginForm;