import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';
import pubsub from 'pubsub-js';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import initSettings from './Settings.run';
import {THEMES_CLASS_NAMES, MENU_LINK_CLASS_NAMES} from '../../constants/settings';
import {initScreenfull} from '../Utils/Utils';
import './Settings.scss';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        // Used to update the language dropdown
        this.valueSelected = 'English'
    }

    componentDidMount() {
        initSettings();
        // https://github.com/facebook/react/issues/5053
        setTimeout(initScreenfull, 2000);
    }

    componentWillMount() {
        this.pubsub_token = pubsub.subscribe('showsettings', () => {
            this.open();
        });
    }

    componentWillUnmount() {
        pubsub.unsubscribe(this.pubsub_token);
    }

    onShowModal() {
        // Add class for white backdrop
        $('body').addClass('modal-backdrop-soft');
    }

    onHiddenModal() {
        // Remove class for white backdrop (if not will affect future modals)
        $('body').removeClass('modal-backdrop-soft');
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    setValueSelected(val) {
        this.valueSelected = val;
    }

    render() {
        const { theme, headerMenulink, sidebarShowheader,
                sidebarShowtoolbar, sidebarOffCanvas } = this.props;
        const themesList = THEMES_CLASS_NAMES.map( value => (
                <div className="pull-left wd-tiny mb" key={value}>
                    <div className="setting-color">
                        <label className={`preview-${value}`}>
                            <Field component="input"
                                   type="radio"
                                   checked={value === theme}
                                   name="theme"
                                   value={value} /><span className="ion-checkmark-round"></span>
                            <div className="t-grid">
                                <div className="t-row">
                                    <div className="t-col preview-header"></div>
                                    <div className="t-col preview-sidebar"></div>
                                    <div className="t-col preview-content"></div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            )
        )
        return (
            <Modal show={this.state.showModal} bsSize="lg" onHide={this.close.bind(this)} className="modal modal-right fade modal-settings"
                onEnter={this.onShowModal.bind(this)} onExited={this.onHiddenModal.bind(this)}>
                <Modal.Header closeButton={true}>
                    <h4 className="modal-title"><span>Settings</span></h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="clearfix mb">
                        { themesList }
                    </div>
                    <hr />
                    <p>
                        <label className="mda-checkbox">
                            <Field component="input" name="sidebarShowheader"
                                   id="sidebar-showheader" type="checkbox"
                                   checked={sidebarShowheader} />
                                   <em className="bg-indigo-500"></em>Sidebar header
                        </label>
                    </p>
                    <p>
                        <label className="mda-checkbox">
                            <Field component="input" name="sidebarShowtoolbar"
                                   id="sidebar-showtoolbar" type="checkbox"
                                   checked={sidebarShowtoolbar} />
                                   <em className="bg-indigo-500"></em>Sidebar toolbar
                        </label>
                    </p>
                    <p>
                        <label className="mda-checkbox">
                            <Field component="input" name="sidebarOffCanvas"
                            id="sidebar-offcanvas" type="checkbox"
                            checked={sidebarOffCanvas} />
                            <em className="bg-indigo-500"></em>Sidebar offcanvas
                        </label>
                    </p>
                    <hr />
                    <p>Navigation icon</p>
                    <p>
                        <label className="mda-radio">
                            <Field component="input" type="radio" name="headerMenulink"
                            value={MENU_LINK_CLASS_NAMES.CLOSE}
                            checked={headerMenulink === MENU_LINK_CLASS_NAMES.CLOSE} />
                            <em className="bg-indigo-500"></em>Close icon
                        </label>
                    </p>
                    <p>
                        <label className="mda-radio">
                            <Field component="input" type="radio" name="headerMenulink"
                            value={MENU_LINK_CLASS_NAMES.SLIDE}
                            checked={headerMenulink === MENU_LINK_CLASS_NAMES.SLIDE} />
                            <em className="bg-indigo-500"></em>Slide arrow
                        </label>
                    </p>
                    <p>
                        <label className="mda-radio">
                            <Field component="input" type="radio" name="headerMenulink"
                            value={MENU_LINK_CLASS_NAMES.ARROW}
                            checked={headerMenulink === MENU_LINK_CLASS_NAMES.ARROW} />
                            <em className="bg-indigo-500"></em>Big arrow
                        </label>
                    </p>
                    <hr />
                    <button type="button" data-toggle-fullscreen="" className="btn btn-default btn-raised">Toggle fullscreen</button>
                    <hr />
                    <p>Change language</p>
                    {/* START Language list */}
                    <div className="btn-group">
                        <button type="button" data-toggle="dropdown" className="btn btn-default btn-block btn-raised">{this.valueSelected}</button>
                        <ul role="menu" className="dropdown-menu dropdown-menu-right animated fadeInUpShort">
                            <li><a href="#" data-set-lang="en" onClick={() => this.setValueSelected('English')}>English</a></li>
                            <li><a href="#" data-set-lang="es" onClick={() => this.setValueSelected('Spanish')}>Spanish</a></li>
                        </ul>
                    </div>
                    {/* END Language list */}
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initialValues: state.settings,
        ...state.settings
    }
}

const settingsForm = {form: 'settings'};

export default connect(mapStateToProps)(reduxForm(settingsForm)(Settings));



