import React from 'react';

import styles from './Model.module.css';
import Backdrop from '../Backdrop/Backdrop';

const model = (props) => (
    <React.Fragment>
        <Backdrop show={props.show} click={props.cancel} />
        <div
            className={styles.Modal}
            style={
                {
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }
            }>
            {props.children}
        </div>
    </React.Fragment>
);

export default model;