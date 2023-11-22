import { Outlet } from 'react-router-dom';
import styles from './Container.module.scss';

const Container = () => {
    return (
        <main className={styles.container}>
            <Outlet />
        </main>
    );
};

export default Container;
