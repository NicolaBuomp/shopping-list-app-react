// src/shared/components/Header.tsx
import React from 'react';

interface HeaderProps {
    onHamburgerClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHamburgerClick }) => {
    return (
        <header
            className="
        fixed top-0 left-0 right-0 h-16
        flex items-center justify-between
        bg-gray-200 dark:bg-gray-800
        border-b border-gray-300 dark:border-gray-700
        px-4
        z-50
      "
        >
            {/* Pulsante hamburger: visibile solo sotto lg */}
            <button
                className="lg:hidden flex flex-col items-center justify-center cursor-pointer"
                onClick={onHamburgerClick}
            >
                <span className="block w-6 h-0.5 bg-black dark:bg-white mb-1"></span>
                <span className="block w-6 h-0.5 bg-black dark:bg-white mb-1"></span>
                <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
            </button>

            {/* Logo o titolo */}
            <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mx-auto">
                Shopping List
            </h1>

            {/* Placeholder a destra (se vuoi un'icona profilo, logout, ecc.) */}
            <div className="w-6 h-6"></div>
        </header>
    );
};

export default Header;
