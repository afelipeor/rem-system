import { Link } from 'react-router-dom';
import styles from './Navbar.module.scss';
import {
    MdHomeFilled,
    MdApartment,
    MdPeople,
    MdWork,
    MdPerson,
    MdLogout,
} from 'react-icons/md';
import DropdownMenu from '../dropdown-menu/DropdownMenu';
import { useState } from 'react';

function Navbar() {
    const [triggerMenu, showDropdown] = useState(false);
    const profilemenu = [
        {
            link: '/logout',
            name: 'Logout',
            icon: <MdLogout />,
        },
    ];
    const toggleDropdown = () => {
        showDropdown(!triggerMenu);
    };
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logo_container}>
                    <Link
                        className={[styles.link, styles.logo].join(' ')}
                        to="/"
                    >
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
            </div>
            <div className={styles.profile}>
                <button
                    className={styles.profile_button}
                    onClick={toggleDropdown}
                >
                    <MdPerson className={styles.icon} />
                </button>

                {triggerMenu && <DropdownMenu menuItems={profilemenu} />}
            </div>
        </nav>
    );
}

export default Navbar;
