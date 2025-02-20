// src/shared/layout/Layout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Layout: React.FC = () => {
    // Stato locale che controlla l'apertura della sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    return (
        <div className="relative min-h-screen">
            {/* Header in alto */}
            <Header onHamburgerClick={handleToggleSidebar} />

            {/* Sidebar laterale */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div
                className="pt-16 transition-all duration-300"
            >
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
