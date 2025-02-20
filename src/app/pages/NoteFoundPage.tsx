// src/pages/NotFoundPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="flex h-screen">
            {/* Sezione di sinistra: gradient + testo */}
            <div className="hidden md:flex w-1/2 bg-gradient-to-r from-red-500 to-orange-500 items-center justify-center p-8 text-white">
                <div className="max-w-md text-center">
                    <h1 className="text-5xl font-extrabold mb-4">404</h1>
                    <p className="mb-6 text-xl">
                        Ops! La pagina che cerchi non esiste.
                    </p>
                </div>
            </div>

            {/* Sezione di destra: background light/dark + contenuto */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-900">
                <h2 className="text-2xl font-bold mb-4 dark:text-gray-100">
                    Pagina non trovata
                </h2>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                    Sembra che tu abbia seguito un link errato o la pagina sia stata rimossa.
                </p>
                <button
                    onClick={handleGoHome}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Torna alla Home
                </button>
            </div>
        </div>
    );
};

export default NotFoundPage;
