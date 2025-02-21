import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../../app/store/store.ts";
import { signupAsync } from "../../../app/store/slice/authSlice.ts";
import clsx from 'clsx';

const SignUpForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [localError, setLocalError] = useState('');

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');

        if (password !== confirmPass) {
            setLocalError('Le password non coincidono!');
            return;
        }
        if (password.length < 6) {
            setLocalError('La password deve essere lunga almeno 6 caratteri.');
            return;
        }

        dispatch(signupAsync({ name, email, password }));
    };

    return (
        <form onSubmit={handleSignUp} className="w-full space-y-6">
            <h2 className="text-2xl font-semibold text-text text-center">Registrati</h2>

            {/* Campo Nome */}
            <div>
                <label className="block text-sm font-medium text-textSoft">Nome</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={clsx(
                        'mt-2 w-full rounded-lg border border-border p-3 bg-secondary text-text',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                    )}
                />
            </div>

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

            {/* Campo Conferma Password */}
            <div>
                <label className="block text-sm font-medium text-textSoft">Conferma Password</label>
                <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                    className={clsx(
                        'mt-2 w-full rounded-lg border border-border p-3 bg-secondary text-text',
                        'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition'
                    )}
                />
            </div>

            {/* Messaggio di errore */}
            {(error || localError) && (
                <div className="text-red-500 text-sm p-2 rounded bg-red-100 dark:bg-red-900 dark:text-red-300">
                    {error || localError}
                </div>
            )}

            {/* Bottone Sign Up */}
            <button
                type="submit"
                disabled={isLoading}
                className={clsx(
                    'w-full py-3 rounded-lg text-white text-lg font-medium transition-colors',
                    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-accent'
                )}
            >
                {isLoading ? 'Creazione in corso...' : 'Crea Account'}
            </button>

        </form>
    );
};

export default SignUpForm;