import { MdClose, MdSearch } from 'react-icons/md';
import styles from './Search.module.scss';
import { useState } from 'react';

const Search = () => {
    const [toggleSearch, setToggleSearch] = useState(true);
    const toggleSearchInput = toggleSearch ? styles.input_active : styles.input;
    const toggleSearchLabel = toggleSearch ? styles.label_active : styles.label;
    const searchButtonActions = () => {
        setToggleSearch(!toggleSearch);
    };

    return (
        <div className={styles.searchbar}>
            <label className={toggleSearchLabel}>
                <input
                    type="text"
                    placeholder="Pesquisar..."
                    className={toggleSearchInput}
                />
            </label>
            <button
                className={styles.icon_button}
                onClick={searchButtonActions}
            >
                {toggleSearch ? (
                    <MdClose className={styles.icon} />
                ) : (
                    <MdSearch className={styles.icon} />
                )}
            </button>
        </div>
    );
};

export default Search;
