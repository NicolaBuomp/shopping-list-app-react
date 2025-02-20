import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './shared/layout/Layout';
import ProtectedRoute from './shared/components/ProtectedRoute';
import LandingPage from './app/pages/LandingPage';
import NotFoundPage from './app/pages/NotFoundPage.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './app/store/store';
import { useEffect } from 'react';

function App() {
    const themeMode = useSelector((state: RootState) => state.theme.mode);

    // Gestione tema senza duplicazione
    useEffect(() => {
        document.documentElement.classList.toggle('dark', themeMode === 'dark');
    }, [themeMode]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LandingPage initialMode="login" />} />
                <Route path="/signup" element={<LandingPage initialMode="signup" />} />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                {/* DashboardPage */}
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
