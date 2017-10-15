import React from 'react';
import { Link } from 'react-router'
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import * as AUTH_ACTIONS from '../../actions/auth';
import signupRun from './Signup.run';
import {Field, reduxForm, Form} from 'redux-form';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Signup extends React.Component {

    componentDidMount() {
        signupRun(onSuccess => onSuccess());
    }

    render() {
        const {email, password} = this.props;

        const tooltip = <Tooltip id={'login'}>Go to Login</Tooltip>;

        return (
            <div className="container-full">
              <div className="container container-xs"><img src="img/logo.png" className="mv-lg block-center img-responsive thumb64" />

                <div id="confirmation" className="card bg-success ng-fadeIn hidden">
                    <div className="card-heading"><em className="ion-checkmark-round pull-right icon-lg"></em>
                        <h4 className="mt0">You are registered!</h4>
                    </div>
                    <div className="card-body">
                        <p>Please check your inbox and follow instructions to confirm your email.</p>
                    </div>
                    <div className="card-footer text-right">
                        <Link to="dashboard" className="btn btn-success btn-flat text-white">
                            Enter
                            <em className="ion-ios-arrow-thin-right icon-fw"></em>
                        </Link>
                    </div>
                </div>
                <Form id="user-signup" onSubmit={event => this.props.Actions.signup(email, password)} name="createForm" noValidate className="card b0 form-validate">
                  <div className="card-offset pb0">
                    <div className="card-offset-item text-left">
                      <OverlayTrigger
                        overlay={tooltip} placement="top"
                        delayShow={300} delayHide={150}>
                      <Link to="login" className="btn-raised btn btn-info btn-circle btn-lg">
                        <em className="ion-arrow-left-a"></em>
                      </Link>
                      </OverlayTrigger>;
                    </div>
                    <div className="card-offset-item text-right">
                      <div id="form-ok" className="btn btn-success btn-circle btn-lg hidden"><em className="ion-checkmark-round"></em></div>
                    </div>
                  </div>
                  <div className="card-heading">
                    <div className="card-title text-center">Create account</div>
                  </div>
                  <div className="card-body">
                    <div className="mda-form-group float-label mda-input-group">
                      <div className="mda-form-control">
                        <Field component="input" type="email" name="accountName" required="" className="form-control" />
                        <div className="mda-form-control-line"></div>
                        <label>Email address</label>
                      </div><span className="mda-input-group-addon"><em className="ion-ios-email-outline icon-lg"></em></span>
                    </div>
                    <div className="mda-form-group float-label mda-input-group">
                      <div className="mda-form-control">
                        <Field component="input" id="account-password" type="password" name="accountPassword" required="" className="form-control" />
                        <div className="mda-form-control-line"></div>
                        <label>Password</label>
                      </div><span className="mda-input-group-addon"><em className="ion-ios-locked-outline icon-lg"></em></span>
                    </div>
                    <div className="mda-form-group float-label mda-input-group">
                      <div className="mda-form-control">
                        <Field component="input" type="password" name="accountPasswordCheck" required="" className="form-control" />
                        <div className="mda-form-control-line"></div>
                        <label>Confirm password</label>
                      </div><span className="mda-input-group-addon"><em className="ion-ios-locked-outline icon-lg"></em></span>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary btn-flat">Create</button>
                  <div className="card-body bg-gray-lighter text-center text-sm"><span className="spr">By registering I accept the</span><a href="#" className="spr">Terms of Service</a><span className="spr">and</span><a href="#" className="spr">Privacy</a></div>
                </Form>
              </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Actions: bindActionCreators(AUTH_ACTIONS, dispatch)
  }
}

const signupForm = {form: 'signup'};


export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(signupForm)(Signup));
