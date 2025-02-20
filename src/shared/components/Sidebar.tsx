// src/shared/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store/store';
import ThemeSwitch from './ThemeSwitch';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <aside
            className={`
    fixed top-16 left-0
    h-[calc(100%-4rem)]
    bg-gray-100 dark:bg-gray-900
    border-r border-gray-200 dark:border-gray-700
    overflow-x-hidden
    transition-all duration-300
    z-40
    ${
                isOpen
                    ? 'w-64'
                    : 'w-0'           
            }
    ${
                !isOpen ? 'lg:w-64' : ''
            }
  `}
        >
            {/* Contenuto della sidebar */}
            <nav className="flex flex-col h-full py-4">
                <Link
                    to="/"
                    className="px-4 py-2 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={onClose}
                >
                    Home
                </Link>

                {/* Rotte visibili solo se user è loggato */}
                {user && (
                    <>
                        <Link
                            to="/dashboard"
                            className="px-4 py-2 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                            onClick={onClose}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/profile"
                            className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800"
                            onClick={onClose}
                        >
                            Profilo
                        </Link>
                    </>
                )}

                {/* Se non è loggato, mostra login/signup */}
                {!user && (
                    <>
                        <Link
                            to="/login"
                            className="px-4 py-2 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                            onClick={onClose}
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800"
                            onClick={onClose}
                        >
                            Registrati
                        </Link>
                    </>
                )}

                {/* Switch del tema in basso */}
                <div className="mt-auto px-4">
                    <ThemeSwitch />
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
