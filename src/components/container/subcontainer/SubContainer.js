import { Outlet } from 'react-router-dom';
import styles from './SubContainer.module.scss';

const SubContainer = () => {
    return (
        <main className={styles.container}>
            <Outlet />
        </main>
    );
};

export default SubContainer;
