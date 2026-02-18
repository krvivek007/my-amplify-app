import { type ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from 'aws-amplify/auth';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        getCurrentUser()
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false));
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
