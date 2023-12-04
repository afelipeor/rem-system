import Search from '../search/Search';
import { MdAdd } from 'react-icons/md';
import styles from './Toolbar.module.scss';

const Toolbar = ({ config }) => {
    if (config.showToolbar) {
        return (
            <div className={styles.toolbar}>
                <div className={styles.toolbar_left}>
                    <h1 className={styles.toolbar_title}>{config.title}</h1>
                </div>
                <div className={styles.toolbar_right}>
                    {config.showSearch && <Search />}
                    {config.showAdd && (
                        <button>
                            <MdAdd />
                        </button>
                    )}
                </div>
            </div>
        );
    }
};

export default Toolbar;
