import React, { Component } from 'react';

import Modal from '../../components/UI/Modals/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {

    state = {
      error: null
    }

    componentWillMount() {
      axios.interceptors.request.use(reqconfig => {
        this.setState({ error: null });
        return reqconfig;
      })
      axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      })
    }

    closeBackdropHandler = () => {
      this.setState({ error: null });
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error}
            modalClosed={this.closeBackdropHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;