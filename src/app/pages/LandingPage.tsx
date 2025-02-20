import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {RootState} from '../store/store';
import LoginForm from '../../shared/components/forms/LoginForm';
import SignUpForm from '../../shared/components/forms/SignUpForm';
import ThemeSwitch from '../../shared/components/ThemeSwitch';

interface LandingPageProps {
    initialMode?: 'login' | 'signup';
}

const LandingPage: React.FC<LandingPageProps> = ({initialMode = 'login'}) => {
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
        <div className="flex flex-col md:flex-row min-h-screen overflow-hidden relative">
            {/* Switch tema in alto a destra */}
            <div className="absolute top-4 right-4 z-50">
                <ThemeSwitch/>
            </div>

            {/* Colonna sinistra: gradient + benvenuto */}
            <div
                className="relative flex-1 bg-gradient-to-r from-purple-600 to-pink-500 p-8 flex flex-col items-center justify-center text-white">
                <div className="max-w-md text-center">
                    <h1 className="text-4xl font-bold mb-4">Benvenuto su Shopping List!</h1>
                    <p className="text-lg">
                        Gestisci le tue liste della spesa in modo collaborativo e intuitivo.
                    </p>
                </div>

                {/* --- Mobile: Form con Card --- */}
                <div
                    className="w-full max-w-sm mt-8 md:hidden bg-white dark:bg-gray-900 text-black dark:text-gray-100 shadow-lg p-6 rounded-xl">
                    {isSignUpMode ? <SignUpForm/> : <LoginForm/>}
                </div>
            </div>

            {/* --- Desktop: Form senza Card --- */}
            <div className="hidden md:flex w-1/2 items-center dark:bg-gray-900 justify-center p-8">
                <div className="w-full max-w-sm">
                    {isSignUpMode ? <SignUpForm/> : <LoginForm/>}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
