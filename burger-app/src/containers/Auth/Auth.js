import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Styles from './Auth.module.css';
import * as actions from '../../store/actions/combinedExport';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {

  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email',
          name: 'email',
          label: 'email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        shouldValidate: true
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password',
          name: 'password',
          label: 'password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        shouldValidate: true
      },
    },
    isSignup: false
  }

  componentDidMount() {
    console.log(this.props.buildingBurger);
    if (!this.props.buildingBurger && this.props.pathToRedirect !== '/') {
      this.props.onSetAuthRedirectPath("/")
    }
  }

  inputChangeHandler = (event, id) => {
    const updatedControls = { ...this.state.controls };
    const updatedElement = { ...updatedControls[id] };
    updatedElement.value = event.target.value;
    updatedElement.touched = true
    if (updatedElement.shouldValidate) {
      updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation);
    }
    updatedControls[id] = updatedElement;

    let formValid = true;
    for (let formElement in updatedControls) {
      formValid = updatedControls[formElement].valid === true && formValid;
    }

    this.setState({ formValid: formValid });
    this.setState({ controls: updatedControls })

  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      }
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
  }

  render() {
    let formElementArray = [];
    for (const element in this.state.controls) {
      formElementArray.push({
        id: element,
        configDetails: this.state.controls[element],
      })
    }

    let form = (<form onSubmit={this.submitHandler}>
      {formElementArray.map(element => {
        return <Input key={element.id} element_type={element.configDetails.elementType}
          element_config={element.configDetails.elementConfig}
          value={element.configDetails.value}
          changed={(event) => this.inputChangeHandler(event, element.id)}
          shouldValidate={element.configDetails.validation}
          touched={element.configDetails.touched}
          valid={element.configDetails.valid} />
      })}
      <Button type="Success" disabled={false}>Submit</Button>
    </form>);

    if (this.props.loading) {
      form = <Spinner />
    }

    let errorMsg = null;
    if (this.props.error) {
      errorMsg = <p>{this.props.error.message}</p>
    }


    let redirectTo = null;

    if (this.props.isAuth) {
      redirectTo = <Redirect to={this.props.pathToRedirect} />
    }


    return (
      <div className={Styles.Auth}>
        {redirectTo}
        {errorMsg}
        {form}
        <Button type="Danger" clicked={this.switchModeHandler} >Switch To {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuth: state.authReducer.token,
    pathToRedirect: state.authReducer.authRedirectPath,
    buildingBurger: state.burgerReducer.building
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);