import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useGlobal from './hooks/useGlobal';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useGlobal();
    const location = useLocation();
    let hasRole = false;
    for (let role in auth.roles) {
        if (allowedRoles.includes(auth.roles[role])) {
            hasRole = true;
            break;
        }
    }

    return hasRole ? (
        <Outlet />
    ) : auth?.username ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
