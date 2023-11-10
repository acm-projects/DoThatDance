import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { auth } from '../firebase'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setAuthenticated(!!user);
            setIsLoading(false);
        })

        return () => unsubscribe();
    }, [])

    if(isLoading) {
        return null;
    }

    return authenticated ? (<Outlet />) : (
        <Navigate to="/login" state={{from: location}} replace />
    )
}

export default ProtectedRoute