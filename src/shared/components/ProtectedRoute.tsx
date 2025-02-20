// src/shared/components/ProtectedRoute.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../app/store/store';
import Spinner from './Spinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, isLoading } = useSelector((state: RootState) => state.auth);

    // Se stiamo ancora caricando lo stato di auth (es. check token),
    // mostra uno spinner generico
    if (isLoading) {
        return <Spinner />;
    }

    // Se l'utente NON è loggato, redirect
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Altrimenti mostra la rotta protetta
    return <>{children}</>;
};

export default ProtectedRoute;
