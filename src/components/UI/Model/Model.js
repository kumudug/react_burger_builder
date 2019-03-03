import React from 'react';

import styles from './Model.module.css';

const model = (props) => (
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
);

export default model;