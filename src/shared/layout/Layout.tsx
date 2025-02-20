// src/shared/layout/Layout.tsx
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    // Stato locale che controlla l'apertura della sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle dell'apertura/chiusura
    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    // Chiusura forzata (es. quando clicchi un link nella sidebar)
    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={handleCloseSidebar}
            />

            {/* Contenuto principale */}
            <div className="flex flex-col flex-1">
                <Header onHamburgerClick={handleToggleSidebar} />
                <main className="pt-16 p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
