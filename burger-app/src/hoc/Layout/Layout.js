import React, { Component } from 'react';

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
        <Toolbar toggleClicked={this.toggleSidebar} />
        <Sidedrawer show={this.state.showSidedrawer} clicked={this.removeSidebar} />
        <main className={Styles.content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}


export default Layout;