// src/shared/components/LoginForm.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../../app/store/slice/authSlice.ts';
import { RootState, AppDispatch } from '../../../app/store/store.ts';

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
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {error && <div className="text-red-500">{error}</div>}
            <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
                {isLoading ? 'Caricamento...' : 'Accedi'}
            </button>
        </form>
    );
};

export default LoginForm;
