import { useNavigate } from 'react-router-dom';
import useGlobal from '../../modules/hooks/useGlobal';

const Logout = () => {
    const { setAuth, auth } = useGlobal();
    const navigate = useNavigate();
    setAuth(null);

    if (!auth) {
        navigate('/login', { replace: true });
    }
};
export default Logout;
