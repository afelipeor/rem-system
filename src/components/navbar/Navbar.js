import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { MdHomeFilled, MdApartment, MdPeople, MdWork } from 'react-icons/md';

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo_container}>
                <Link className={[styles.link, styles.logo].join(' ')} to="/">
                    <MdHomeFilled className={styles.icon} />
                </Link>
            </div>
            <div className={styles.main_navigation}>
                <Link className={styles.link} to="/assets">
                    <MdApartment className={styles.icon} />
                    <span>Imóveis</span>
                </Link>
                <Link className={styles.link} to="/clients">
                    <MdPeople className={styles.icon} />
                    <span>Clientes</span>
                </Link>
                <Link className={styles.link} to="/manager">
                    <MdWork className={styles.icon} />
                    <span>Gerência</span>
                </Link>
            </div>
            <div className={styles.profile}></div>
        </nav>
    );
}

export default Navbar;
