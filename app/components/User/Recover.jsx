import React from 'react';
import { Link } from 'react-router'
import {bindActionCreators} from 'redux';
import {reduxForm, Field, Form} from 'redux-form';
import {connect} from 'react-redux';

import recoverRun from './Recover.run';
import * as AUTH_ACTIONS from '../../actions/auth';
import {Tooltip, OverlayTrigger} from 'react-bootstrap';

class Recover extends React.Component {

    componentDidMount() {
        recoverRun();
    }

    render() {
        const tooltip = <Tooltip id={'login'}>Go to Login</Tooltip>
        return (
            <div className="container-full">
                <div className="container container-xs">
                    <div className="text-center mv-lg"><img src="img/user/01.jpg" className="img-circle mb block-center img-responsive thumb64" />
                        <p>Brian Walker</p>
                    </div>
                    <div id="confirmation" className="card bg-success ng-fadeIn hidden">
                        <div className="card-heading"><em className="ion-checkmark-round pull-right icon-lg"></em>
                            <h4 className="mt0">Mail Sent!</h4>
                        </div>
                        <div className="card-body">
                            <p>Please check your inbox and follow instructions to reset your password.</p>
                        </div>
                        <div className="card-footer text-right">
                            <Link to="login" className="btn btn-success btn-flat text-white">
                                Login
                                <em className="ion-ios-arrow-thin-right icon-fw"></em>
                            </Link>
                        </div>
                    </div>
                    <Form id="user-recover" onSubmit={event => this.props.Actions.recover(this.props.email)} name="recoverForm" noValidate className="card form-validate">
                        <div className="card-offset pb0">
                            <div className="card-offset-item text-left">
                                <OverlayTrigger
                                        overlay={tooltip} placement="top"
                                        delayShow={300} delayHide={150}>
                                    <Link to="login" className="btn-raised btn btn-info btn-circle btn-lg">
                                        <em className="ion-arrow-left-a"></em>
                                    </Link>
                                </OverlayTrigger>
                            </div>
                            <div className="card-offset-item text-right">
                                <div id="form-ok" className="btn btn-success btn-circle btn-lg hidden"><em className="ion-checkmark-round"></em></div>
                            </div>
                        </div>
                        <div className="card-heading">
                            <p className="text-center text-inherit">Fill with your mail to receive instructions<br/>
                            on how to reset your password.</p>
                        </div>
                        <div className="card-body">
                            <div className="mda-form-group float-label mda-input-group">
                                <div className="mda-form-control">
                                    <Field component="input" type="email" name="accountName" required="" className="form-control" />
                                    <div className="mda-form-control-line"></div>
                                    <label>Email address</label>
                                </div><span className="mda-input-group-addon"><em className="ion-ios-email-outline icon-lg"></em></span>
                            </div>
                        </div>

                        <div className="card-offset pb0">
                            <div className="card-offset-item text-right ng-fadeInLeftShort">
                                <button type="submit" className="btn btn-success btn-circle btn-lg"><em className="ion-checkmark-round"></em></button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email
    }
}

const mapDispatchToProps = dispatch => {
    return {
        Actions: bindActionCreators(AUTH_ACTIONS, dispatch)
    }
}

const recoverForm = {form: 'recover'};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(recoverForm)(Recover));
