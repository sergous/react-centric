import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm , Form} from 'redux-form';
import { Link } from 'react-router'

import * as AUTH_ACTIONS from '../../actions/auth.jsx'
import loginRun from './Login.run';
import {bindActionCreators} from 'redux';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

class Login extends React.Component {

    constructor(props, context){
        super(props, context);
    }

    componentDidMount() {
        loginRun(form => {
            console.log('Form submitted! [' + this.refs.accountName.value + ']');
            this.context.router.push('/dashboard');
        });
    }

    render() {
        const {email, password} = this.props;
        const tooltip = <Tooltip id={'signup'}>Register</Tooltip>
        return (
            <div className="container-full">
                <div className="container container-xs"><img src="img/logo.png" className="mv-lg block-center img-responsive thumb64" />
                    <Form id="user-login" onSubmit={event => this.props.Actions.login(email, password)} name="loginForm" noValidate className="card b0 form-validate">
                        <div className="card-offset pb0">
                            <div className="card-offset-item text-right">
                                <OverlayTrigger
                                        overlay={tooltip} placement="top"
                                        delayShow={300} delayHide={150}>
                                    <Link to="signup" className="btn-raised btn btn-info btn-circle btn-lg">
                                        <em className="ion-person-add"></em>
                                    </Link>
                                </OverlayTrigger>
                            </div>
                            <div className="card-offset-item text-right hidden">
                                <div className="btn btn-success btn-circle btn-lg"><em className="ion-checkmark-round"></em></div>
                            </div>
                        </div>
                        <div className="card-heading">
                            <div className="card-title text-center">Login</div>
                        </div>
                        <div className="card-body">
                            <div className="mda-form-group float-label mda-input-group">
                                <div className="mda-form-control">
                                    <Field component="input" type="email" ref="accountName" name="accountName" required="" className="form-control" />
                                    <div className="mda-form-control-line"></div>
                                    <label>Email address</label>
                                </div><span className="mda-input-group-addon"><em className="ion-ios-email-outline icon-lg"></em></span>
                            </div>
                            <div className="mda-form-group float-label mda-input-group">
                                <div className="mda-form-control">
                                    <Field component="input" type="password" ref="accountPassword" name="accountPassword" required="" className="form-control" />
                                    <div className="mda-form-control-line"></div>
                                    <label>Password</label>
                                </div><span className="mda-input-group-addon"><em className="ion-ios-locked-outline icon-lg"></em></span>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-flat">Authenticate</button>
                    </Form>
                    <div className="text-center text-sm">
                        <Link to="recover" className="text-inherit">Forgot password?</Link>
                    </div>
                </div>
            </div>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.object
};

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

const loginForm = {form: 'login'};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(loginForm)(Login));
