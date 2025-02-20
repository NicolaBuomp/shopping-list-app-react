import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './shared/layout/Layout';
import ProtectedRoute from './shared/components/ProtectedRoute';
import LandingPage from './app/pages/LandingPage';
import NotFoundPage from './app/pages/NoteFoundPage';
import { useSelector } from 'react-redux';
import { RootState } from './app/store/store';
import { useEffect } from 'react';

function App() {
    const themeMode = useSelector((state: RootState) => state.theme.mode);

    useEffect(() => {
        if (themeMode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [themeMode]);

    return (
        <BrowserRouter>
            <Routes>
                {/*
          Se visiti "/", LandingPage mostra il login di default (o un welcome).
          "initialMode" = null (puoi interpretarlo come "login" di default).
        */}
                <Route path="/" element={<LandingPage />} />

                {/*
          Se visiti "/login", passiamo explicit "initialMode='login'"
          → la LandingPage apre la sezione login
        */}
                <Route path="/login" element={<LandingPage initialMode="login" />} />

                {/*
          Se visiti "/signup", passiamo explicit "initialMode='signup'"
          → la LandingPage apre la sezione signup
        */}
                <Route path="/signup" element={<LandingPage initialMode="signup" />} />

                {/*
          Rotta protetta: /home
          Se loggato → Layout (sidebar, etc.), altrimenti reindirizza a /login
        */}
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                {/* <DashboardPage /> */}
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Fallback 404 */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
