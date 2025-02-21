import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import LoginForm from '../../shared/components/forms/LoginForm';
import SignUpForm from '../../shared/components/forms/SignUpForm';
import ThemeSwitch from '../../shared/components/ThemeSwitch';

interface LandingPageProps {
    initialMode?: 'login' | 'signup';
}

const LandingPage: React.FC<LandingPageProps> = ({ initialMode = 'login' }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user) {
            navigate('/home');
        }
    }, [user, navigate]);

    const isSignUpMode = location.pathname === '/signup' || initialMode === 'signup';

    return (
        <div className="min-h-screen flex items-center bg-bg justify-center text-text">
            {/* Switch Tema */}
            <div className="absolute top-6 right-6">
                <ThemeSwitch />
            </div>

            {/* Contenitore principale */}
            <div className="w-full max-w-md p-8 bg-bgSoft/80 backdrop-blur-md shadow-lg rounded-xl">
                {/* Logo e Titolo */}
                <div className="flex flex-col items-center mb-6">
                    {/*<img src="/logo.svg" alt="Logo" className="w-16 h-16 animate-bounce" />*/}
                    <h1 className="text-3xl font-bold mt-3">Shopping List</h1>
                    <p className="text-textSoft text-sm">Organizza la tua spesa in modo smart</p>
                </div>

                {/* Form Login o Signup */}
                {isSignUpMode ? <SignUpForm /> : <LoginForm />}

                {/* Link per cambio modalità */}
                <div className="mt-5 text-center">
                    <button
                        type="button"
                        onClick={() => navigate(isSignUpMode ? '/login' : '/signup')}
                        className="text-primary font-semibold hover:underline"
                    >
                        {isSignUpMode ? 'Hai già un account? Accedi' : 'Non hai un account? Registrati'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;