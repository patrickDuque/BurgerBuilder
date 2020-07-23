import React, { Component } from 'react';
import Modal from '../components/UI/Modal';
import Aux from './Auxilliary';

export default (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error : null
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} removeModal={() => this.setState({ error: null })}>
            <p>{this.state.error ? this.state.error.message : null}</p>
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};
