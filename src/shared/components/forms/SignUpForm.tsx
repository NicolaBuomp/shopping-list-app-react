// src/shared/components/SignUpForm.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AppDispatch, RootState} from "../../../app/store/store.ts";
import {signupAsync} from "../../../app/store/slice/authSlice.ts";

const SignUpForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [localError, setLocalError] = useState('');

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        // Controlli di base
        if (password !== confirmPass) {
            setLocalError('Le password non coincidono!');
            return;
        }
        if (password.length < 6) {
            setLocalError('La password deve essere lunga almeno 6 caratteri.');
            return;
        }

        dispatch(signupAsync({name, email, password }));
    };

    return (
        <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
            {(error || localError) && (
                <div className="text-red-500">{error || localError}</div>
            )}

            <input
                type="text"
                placeholder="Nome"
                className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

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

            <input
                type="password"
                placeholder="Conferma Password"
                className="border p-2 rounded dark:bg-gray-700 dark:text-gray-200"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                required
            />

            <button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
            >
                {isLoading ? 'Creazione in corso...' : 'Crea Account'}
            </button>
        </form>
    );
};

export default SignUpForm;
