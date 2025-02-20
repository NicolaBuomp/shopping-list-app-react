// src/App.tsx
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import ProtectedRoute from './shared/components/ProtectedRoute';
import {RootState} from "./app/store/store.ts";
import LoginPage from "./app/pages/Auth/LoginPage.tsx";
import Layout from "./shared/layout/Layout.tsx";
import SignUpPage from "./app/pages/Auth/SignUpPage.tsx";

function App() {
    // Leggiamo dallo stato se il tema è 'light' o 'dark'
    const themeMode = useSelector((state: RootState) => state.theme.mode);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', themeMode === 'dark');
    }, [themeMode]);

    return (
        <BrowserRouter>
            <Routes>
                {/* Rotta con Layout "base".
            <Layout> include l'header e un <Outlet /> per il contenuto */}
                <Route path="/" element={<Layout />}>
                    {/* Rotta predefinita (index) → HomePage */}
                    {/*<Route index element={<HomePage />} />*/}

                    {/* Rotte pubbliche */}
                    <Route path="login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />

                    {/* Rotte protette */}
                    <Route
                        path="dashboard"
                        element={
                            <ProtectedRoute>
                                <></>
                                {/*<DashboardPage />*/}
                            </ProtectedRoute>
                        }
                    />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
