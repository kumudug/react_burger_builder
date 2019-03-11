import React, { Component } from 'react';

import styles from './Model.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Model extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show != this.props.show;
    }

    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} click={this.props.cancel} />
                <div
                    className={styles.Modal}
                    style={
                        {
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: this.props.show ? '1' : '0'
                        }
                    }>
                    {this.props.children}
                </div>
            </React.Fragment>
        );
    }
}

export default Model;