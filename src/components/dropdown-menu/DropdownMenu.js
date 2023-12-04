import { Link } from 'react-router-dom/dist';
import styles from './DropdownMenu.module.scss';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';

const DropdownMenu = ({ menuItems }) => {
    const dropdownMenu = useRef(null);
    const [classes, setClass] = useState('');

    useEffect(() => {
        const viewport = dropdownMenu.current.getBoundingClientRect();
        const windowView = document.documentElement.getBoundingClientRect();
        const pull =
            viewport.width + viewport.right > windowView.width
                ? styles.pull_left
                : viewport.left > 0
                ? styles.pull_right
                : '';
        setClass(`${pull}`);
    }, []);
    const list = menuItems.map((item, index) => {
        return (
            <li key={item.id ?? index}>
                <Link className={styles.link} to={item.link}>
                    {item.icon}
                    {item.name}
                </Link>
            </li>
        );
    });
    return (
        <div className={[styles.menu, classes].join(' ')} ref={dropdownMenu}>
            <MdKeyboardArrowUp className={styles.arrow} />
            <ul className={styles.dropdown_content}>{list}</ul>
        </div>
    );
};
export default DropdownMenu;
