import React, { Component } from 'react';

import Model from '../../components/UI/Model/Model';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            };
            axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                console.log(error);
                this.setState({ error: error });
            });
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <React.Fragment>
                    <Model
                        modelClosed={this.errorConfirmedHandler}
                        show={this.state.error}>
                        Something went wrong ! - {this.state.error ? this.state.error.message : null}
                    </Model>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler;