// src/pages/SignUpPage.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {AppDispatch, RootState} from "../../store/store.ts";
import {signupAsync} from "../../store/slice/authSlice.ts";
import Spinner from "../../../shared/components/Spinner.tsx";

const SignUpPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { isLoading, error } = useSelector((state: RootState) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(signupAsync({ email, password }))
            .unwrap()
            .then(() => {
                // Se signup ok, reindirizza a /dashboard o /login, come preferisci
                navigate('/dashboard');
            })
            .catch((err: any) => {
                console.error(err);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[var(--color-dark-background)]">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md">
                <h2 className="text-2xl mb-4 dark:text-gray-100">Sign Up</h2>

                {error && <div className="text-red-500 mb-2">{error}</div>}

                <div className="mb-4">
                    <label className="block mb-1 text-gray-700 dark:text-gray-300">Email</label>
                    <input
                        type="email"
                        className="w-full border p-2 dark:bg-gray-700 dark:text-gray-200"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-gray-700 dark:text-gray-300">Password</label>
                    <input
                        type="password"
                        className="w-full border p-2 dark:bg-gray-700 dark:text-gray-200"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner /> : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default SignUpPage;
