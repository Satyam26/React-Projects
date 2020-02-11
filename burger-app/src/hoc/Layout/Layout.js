import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';
import Styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {

  state = {
    showSidedrawer: false
  }

  toggleSidebar = () => {
    if (this.state.showSidedrawer) {
      this.setState({ showSidedrawer: false });
    } else {
      this.setState({ showSidedrawer: true });
    }
  }

  removeSidebar = () => {
    this.setState({ showSidedrawer: false });
  }

  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuthenticated} toggleClicked={this.toggleSidebar} />
        <Sidedrawer isAuth={this.props.isAuthenticated} show={this.state.showSidedrawer} clicked={this.removeSidebar} />
        <main className={Styles.content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null
  }
}

export default connect(mapStateToProps)(Layout);