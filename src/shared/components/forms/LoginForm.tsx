import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {AppDispatch, RootState} from "../../../app/store/store.ts";
import {loginAsync} from "../../../app/store/slice/authSlice.ts";
import {Field, Fieldset, Input, Label, Legend} from '@headlessui/react';
import clsx from 'clsx';

const LoginForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {isLoading, error} = useSelector((state: RootState) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginAsync({email, password}));
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg px-4">
            <Fieldset className="space-y-6">
                <Legend className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Accedi al tuo account
                </Legend>

                {/* Campo Email */}
                <Field>
                    <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={clsx(
                            'mt-2 block w-full rounded-lg border p-2 dark:bg-gray-700 dark:text-gray-100',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500'
                        )}
                    />
                </Field>

                {/* Campo Password */}
                <Field>
                    <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">Password</Label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={clsx(
                            'mt-2 block w-full rounded-lg border p-2 dark:bg-gray-700 dark:text-gray-100',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-blue-500'
                        )}
                    />
                </Field>

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
                        'w-full py-2 rounded-lg text-white transition-colors',
                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    )}
                >
                    {isLoading ? 'Caricamento...' : 'Accedi'}
                </button>

                {/* Switch tra Login e Signup */}
                <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="w-full mt-2 text-center text-blue-600 dark:text-blue-400 underline"
                >
                    Non hai un account? Crea uno
                </button>
            </Fieldset>
        </form>
    );
};

export default LoginForm;
