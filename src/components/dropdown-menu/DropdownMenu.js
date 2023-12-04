import { Link } from 'react-router-dom/dist';
import styles from './DropdownMenu.module.scss';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';

const DropdownMenu = ({ menuItems }) => {
    const dropdownMenu = useRef(null);
    const [classes, setClasses] = useState('');
    const [parentPull, setParentPull] = useState(null);

    useEffect(() => {
        const viewport = dropdownMenu.current.getBoundingClientRect();
        console.log('viewport:', viewport.height);
        const windowView = document.documentElement.getBoundingClientRect();
        const parentWidth =
            dropdownMenu.current.parentElement.getBoundingClientRect().width;
        const pull =
            viewport.width + viewport.right > windowView.width
                ? styles.pull_left
                : viewport.left > 0
                ? styles.pull_right
                : '';
        setClasses(`${styles.menu} ${pull}`);
        setParentPull({
            transform:
                viewport.width + viewport.right > windowView.width
                    ? `translate(-${parentWidth * 0.5 - 5}px, ${
                          viewport.height * 0.75 + 32
                      }px)`
                    : viewport.left > 0
                    ? `translate(${parentWidth * 0.5}px, ${
                          viewport.height * 0.75 + 32
                      }px)`
                    : {},
        });
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
        <div className={classes} style={parentPull} ref={dropdownMenu}>
            <MdKeyboardArrowUp className={styles.arrow} />
            <ul className={styles.dropdown_content}>{list}</ul>
        </div>
    );
};
export default DropdownMenu;
