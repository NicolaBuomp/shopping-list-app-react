import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import LoginForm from '../../shared/components/forms/LoginForm';
import SignUpForm from '../../shared/components/forms/SignUpForm';
import ThemeSwitch from '../../shared/components/ThemeSwitch';

interface LandingPageProps {
    initialMode?: 'login' | 'signup';
}

const LandingPage: React.FC<LandingPageProps> = ({ initialMode }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();

    // Se l’utente è già loggato, vai a /home
    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    // Determina se siamo in "signup" o "login"
    // Se initialMode è 'signup', allora showSignUpForm = true
    // Altrimenti false
    const showSignUpForm = initialMode === 'signup';

    // Funzione toggle che cambia rotta
    const toggleForm = () => {
        if (showSignUpForm) {
            // Se siamo su signup, passiamo a login
            navigate('/login');
        } else {
            navigate('/signup');
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen overflow-hidden relative">
            {/* Switch tema in alto a destra */}
            <div className="absolute top-4 right-4 z-50">
                <ThemeSwitch />
            </div>

            {/* Colonna sinistra: gradient + benvenuto */}
            <div
                className="
          relative flex-1
          bg-gradient-to-r from-purple-600 to-pink-500
          p-8 flex flex-col items-center justify-center
          text-white
        "
            >
                <div className="max-w-md text-center">
                    <h1 className="text-4xl font-bold mb-4">Benvenuto su Shopping List!</h1>
                    <p className="text-lg">
                        Gestisci le tue liste della spesa in modo collaborativo e intuitivo.
                    </p>
                </div>

                {/* Card su mobile */}
                <div className="w-full max-w-sm mt-8 md:hidden">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-2xl dark:text-gray-100">
                        <h2 className="text-2xl font-bold mb-4">
                            {showSignUpForm ? 'Crea un account' : 'Accedi al tuo account'}
                        </h2>

                        {showSignUpForm ? <SignUpForm /> : <LoginForm />}

                        <button
                            onClick={toggleForm}
                            className="mt-4 text-blue-600 dark:text-blue-400 underline"
                        >
                            {showSignUpForm
                                ? 'Hai già un account? Accedi'
                                : 'Non hai un account? Crea uno'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Colonna destra (desktop) */}
            <div className="hidden md:flex w-1/2 bg-white dark:bg-gray-900 items-center justify-center p-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-2xl w-full max-w-sm dark:text-gray-100">
                    <h2 className="text-2xl font-bold mb-4">
                        {showSignUpForm ? 'Crea un account' : 'Accedi al tuo account'}
                    </h2>

                    {showSignUpForm ? <SignUpForm /> : <LoginForm />}

                    <button
                        onClick={toggleForm}
                        className="mt-4 text-blue-600 dark:text-blue-400 underline"
                    >
                        {showSignUpForm
                            ? 'Hai già un account? Accedi'
                            : 'Non hai un account? Crea uno'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
