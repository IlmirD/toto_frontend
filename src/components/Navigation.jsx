import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './css/navigation.module.css';

import { ReactComponent as Logout } from './assets/logout.svg';

function Navigation() {

    // удалеем токены, когда выходим
    const logout = () => {
        localStorage.removeItem('a');
        localStorage.removeItem('r');

        window.location.replace('/');
    }

    return (
        <div className={styles.navbar}>
            <NavLink to='/'>
                <h3 className={styles.logo}>Главная</h3>
            </NavLink>

            {localStorage.getItem('a') &&
                <>
                    <NavLink to='/create'>
                        <p className={styles.add_btn}>Создать</p>
                    </NavLink>

                    <Logout className={styles.logout_icon} onClick={logout} />
                </>
            }
        </div>
    );
}

export default Navigation;