import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import * as actions from './store/actions/combinedExport';
//import Auth from './containers/Auth/Auth';

const BurgerBuilder = lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));
const Logout = lazy(() => import('./containers/Logout/Logout'));


class App extends Component {

  componentDidMount() {
    this.props.onLoginCheckStatus();
  }

  render() {


    /* let routes = (
      <Switch>
        <Suspense fallback={<div style={{ color: 'green', textAlign: 'center' }}>...Loading...</div>}>

          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Suspense>
      </Switch>
    );

    console.log(this.props.isAuth);

    if (!this.props.isAuth) {
      routes = (
        <Switch>
          <Suspense fallback={<div style={{ color: 'green', textAlign: 'center' }}>...Loading...</div>}>
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
          </Suspense>
        </Switch>
      );
    } */

    return (
      <div>
        <Layout>
          <Switch>
            {/* {routes} */}
            <Suspense fallback={<div style={{ color: 'green', textAlign: 'center' }}>...Loading...</div>}>
              <Route path="/auth" component={Auth} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/logout" component={Logout} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Suspense>
          </Switch>
        </Layout>
      </div>
    );
  }
}




const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginCheckStatus: () => dispatch(actions.checkLoginAccess())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App)); 