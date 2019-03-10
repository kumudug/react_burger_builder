import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let atttachedClasses = [styles.SideDrawer, styles.Close];
    if(props.open) {
        atttachedClasses = [styles.SideDrawer, styles.Open];
    }
    return (
        <React.Fragment>
            <Backdrop show={props.open} click={props.closed} />
            <div className={atttachedClasses.join(' ')}>
                <div className={styles.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;