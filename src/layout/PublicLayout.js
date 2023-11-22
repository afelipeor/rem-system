import { Outlet } from 'react-router-dom';
import styles from './PublicLayout.module.scss';

const PublicLayout = () => {
    return (
        <main className={styles.container}>
            <Outlet />
        </main>
    );
};

export default PublicLayout;
