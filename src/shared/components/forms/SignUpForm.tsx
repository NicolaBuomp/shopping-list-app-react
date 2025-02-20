import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {AppDispatch, RootState} from "../../../app/store/store.ts";
import {signupAsync} from "../../../app/store/slice/authSlice.ts";
import {Field, Fieldset, Input, Label, Legend} from '@headlessui/react';
import clsx from 'clsx';

const SignUpForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {isLoading, error} = useSelector((state: RootState) => state.auth);

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

        dispatch(signupAsync({name, email, password}));
    };

    return (
        <form onSubmit={handleSignUp} className="w-full max-w-lg px-4">
            <Fieldset className="space-y-6">
                <Legend className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Crea un nuovo account
                </Legend>

                {/* Campo Nome */}
                <Field>
                    <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">Nome</Label>
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={clsx(
                            'mt-2 block w-full rounded-lg border p-2 dark:bg-gray-700 dark:text-gray-100',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-green-500'
                        )}
                    />
                </Field>

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
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-green-500'
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
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-green-500'
                        )}
                    />
                </Field>

                {/* Campo Conferma Password */}
                <Field>
                    <Label className="text-sm font-medium text-gray-900 dark:text-gray-100">Conferma Password</Label>
                    <Input
                        type="password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        required
                        className={clsx(
                            'mt-2 block w-full rounded-lg border p-2 dark:bg-gray-700 dark:text-gray-100',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-green-500'
                        )}
                    />
                </Field>

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
                        'w-full py-2 rounded-lg text-white transition-colors',
                        isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    )}
                >
                    {isLoading ? 'Creazione in corso...' : 'Crea Account'}
                </button>

                {/* Switch tra Sign Up e Login */}
                <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="w-full mt-2 text-center text-blue-600 dark:text-blue-400 underline"
                >
                    Hai già un account? Accedi
                </button>
            </Fieldset>
        </form>
    );
};

export default SignUpForm;
