import React from 'react';
import pubsub from 'pubsub-js';
import { Grid, Row, Col, Dropdown, MenuItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';

import * as PROFILE_ACTIONS from '../../actions/profile';
import * as USER_ACTIONS from '../../actions/user';
import profileRun from './Profile.run';
import {bindActionCreators} from 'redux';
import {FORMAT_FULL_DATE_XEDITABLE, FORMAT_FULL_DATE_MOMENT} from '../../constants/index';

class Profile extends React.Component {

    componentWillMount() {
        pubsub.publish('setPageTitle', this.constructor.name);
    }

    componentDidMount() {
        profileRun(this.props.profileActions);
    }

    handleOpenContact(contact) {
        const {openUser, openUsers} = this.props.userActions;
        openUsers();
        openUser(contact);
    }

    render() {
        const { contacts = [], profileUser, userActions: {openUsers} } = this.props;
        const contactsList = contacts.map( contact => (
                <div className="mda-list-item" key={contact.id}>
                    <img src={contact.photo} alt={contact.name} className="mda-list-item-img"/>
                    <div className="mda-list-item-text mda-2-line">
                        <h3><a onClick={() => this.handleOpenContact(contact)}>{contact.name}</a></h3>
                        <div className="text-muted text-ellipsis">{contact.position}</div>
                    </div>
                </div>
            )
        )
        return (
            <section>
                <div className="container-overlap bg-blue-500">
                    <div className="media m0 pv">
                        <div className="media-left">
                            <a href="#">
                                <img src={profileUser.photo}
                                     alt={profileUser.name}
                                     className="media-object img-circle thumb64"/>
                            </a>
                        </div>
                        <div className="media-body media-middle">
                            <h4 className="media-heading is-editable text-inherit" data-name="name">{profileUser.name}</h4>
                            <span className="text-muted is-editable text-inherit" data-name="position">{profileUser.position}</span>
                        </div>
                    </div>
                </div>
                <Grid fluid>
                    <Row>
                        {/* Left column */}
                        <Col md={7} lg={8}>
                            <form name="user.profileForm" className="card">
                                <h5 className="card-heading pb0">
                                    {/* START dropdown */}
                                    <div className="pull-right">
                                        <Dropdown pullRight id="dd1">
                                            <Dropdown.Toggle noCaret className="btn-flat btn-flat-icon">
                                              <em className="ion-android-more-vertical"></em>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="md-dropdown-menu" >
                                                <MenuItem eventKey="1">Action 1</MenuItem>
                                                <MenuItem eventKey="2">Action 2</MenuItem>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    {/* END dropdown */}
                                    About
                                </h5>
                                <div className="card-body">
                                    <p data-type="textarea" data-name="about" className="is-editable text-inherit">{profileUser.about}</p>
                                </div>
                                <div className="card-divider"></div>
                                <div className="card-offset">
                                    <div className="card-offset-item text-right">
                                        <button id="edit-enable" type="button" className="btn-raised btn btn-warning btn-circle btn-lg"><em className="ion-edit"></em></button>
                                        <button id="edit-disable" type="submit" className="btn-raised btn btn-success btn-circle btn-lg hidden"><em className="ion-checkmark-round"></em></button>
                                    </div>
                                </div>
                                <h5 className="card-heading pb0">Contact Information</h5>
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <td><em className="ion-document-text icon-fw mr"></em>Area</td>
                                                <td>
                                                    <span className="is-editable text-inherit" data-name="area">
                                                        {profileUser.area}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><em className="ion-egg icon-fw mr"></em>Birthday</td>
                                                <td><span data-type="date" data-format={FORMAT_FULL_DATE_XEDITABLE} data-mode="popup" data-name="birthday" className="is-editable text-inherit">
                                                {moment(profileUser.birthday).format(FORMAT_FULL_DATE_MOMENT)}</span></td>
                                            </tr>
                                            <tr>
                                                <td><em className="ion-ios-body icon-fw mr"></em>Member since</td>
                                                <td><span data-type="date" data-mode="popup" data-format={FORMAT_FULL_DATE_XEDITABLE} data-name="registered" className="is-editable text-inherit">{moment(profileUser.registered).format(FORMAT_FULL_DATE_MOMENT)}</span></td>
                                            </tr>
                                            <tr>
                                                <td><em className="ion-man icon-fw mr"></em>Gender</td>
                                                <td><a id="gender" href="#" data-type="select"
                                                data-pk="0" data-value={profileUser.gender}
                                                data-title="Select sex" data-name="gender"
                                                className="text-inherit"></a></td>
                                            </tr>
                                            <tr>
                                                <td><em className="ion-android-home icon-fw mr"></em>Address</td>
                                                <td>
                                                    <span className="is-editable text-inherit" data-name="address">
                                                        {profileUser.address}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><em className="ion-email icon-fw mr"></em>Email</td>
                                                <td>
                                                    <span className="is-editable text-inherit"
                                                          data-type="email" data-name="email">
                                                        {profileUser.email}
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><em className="ion-ios-telephone icon-fw mr"></em>Contact phone</td>
                                                <td><span className="is-editable text-inherit"
                                                          data-name="phone" data-type="tel">{profileUser.phone}</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-divider"></div>
                                <h5 className="card-heading pb0">Recent articles</h5>
                                <div className="card-body">
                                    <ul className="mda-list">
                                        <li className="mda-list-item pl0 bb">
                                            <div className="mda-list-item-text">
                                                <h3><a href="#">Release 3.0 is out</a></h3>
                                                <p>Proin metus justo, commodo in ultrices...</p><small className="text-muted">2 days ago</small>
                                            </div>
                                            <div className="pull-right">
                                                <div className="pt-lg"><em className="icon-2x ion-checkmark-circled text-success"></em></div>
                                            </div>
                                        </li>
                                        <li className="mda-list-item pl0 bb">
                                            <div className="mda-list-item-text">
                                                <h3><a href="#">Improving compatibility</a></h3>
                                                <p>Proin metus justo, commodo in ultrices...</p><small className="text-muted">3 days ago</small>
                                            </div>
                                            <div className="pull-right">
                                                <div className="pt-lg"><em className="icon-2x ion-checkmark-circled text-success"></em></div>
                                            </div>
                                        </li>
                                        <li className="mda-list-item pl0">
                                            <div className="mda-list-item-text">
                                                <h3><a href="#">Small decisions count</a></h3>
                                                <p>Proin metus justo, commodo in ultrices...</p><small className="text-muted">3 days ago</small>
                                            </div>
                                            <div className="pull-right">
                                                <div className="pt-lg"><em className="icon-2x ion-minus-circled text-warning"></em></div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </form>
                        </Col>
                        {/* Right column */}
                        <Col md={5} lg={4}>
                            <div className="card">
                                <h5 className="card-heading">
                                    {/* START dropdown */}
                                    <div className="pull-right">
                                        <Dropdown pullRight id="dd2">
                                            <Dropdown.Toggle noCaret className="btn-flat btn-flat-icon">
                                              <em className="ion-android-more-vertical"></em>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="md-dropdown-menu" >
                                                <MenuItem eventKey="1">Action 1</MenuItem>
                                                <MenuItem eventKey="2">Action 2</MenuItem>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                    {/* END dropdown */}
                                </h5>
                                <div className="mda-list">
                                    {contactsList}
                                </div>
                                <div className="card-body pv0 text-right">
                                    <Link onClick={() => openUsers()} className="btn btn-flat btn-info">View all</Link>
                                </div>
                                <div className="card-divider"></div>
                                <h5 className="card-heading">Activity</h5>
                                <div className="card-body pb0">
                                    <p className="pull-left mr"><em className="ion-record text-info"></em></p>
                                    <div className="oh">
                                        <p><strong className="mr-sm">Added</strong><span className="mr-sm">a new issue</span><a href="#">#5478</a></p>
                                        <div className="clearfix">
                                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>an hour ago</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pb0">
                                    <p className="pull-left mr"><em className="ion-record text-danger"></em></p>
                                    <div className="oh">
                                        <p><strong className="mr-sm">Commented</strong><span className="mr-sm"> on the project</span><a href="#">Material</a></p>
                                        <p className="bl pl"><i>That's awesome!</i></p>
                                        <div className="clearfix">
                                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>2 hours ago</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pb0">
                                    <p className="pull-left mr"><em className="ion-record text-success"></em></p>
                                    <div className="oh">
                                        <p><strong className="mr-sm">Completed</strong><span> all tasks asigned this week</span></p>
                                        <div className="clearfix">
                                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>3 hours ago</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body pb0">
                                    <p className="pull-left mr"><em className="ion-record text-info"></em></p>
                                    <div className="oh">
                                        <p><strong className="mr-sm">Published</strong><span className="mr-sm"> new photos on the album</span><a href="#">WorldTrip</a></p>
                                        <p><a href="#"><img src="img/pic4.jpg" alt="Pic" className="mr-sm thumb48"/></a><a href="#"><img src="img/pic5.jpg" alt="Pic" className="mr-sm thumb48"/></a><a href="#"><img src="img/pic6.jpg" alt="Pic" className="mr-sm thumb48"/></a></p>
                                        <div className="clearfix">
                                            <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>4 hours ago</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="clearfix">
                                        <p className="pull-left mr"><em className="ion-record text-primary"></em></p>
                                        <div className="oh">
                                            <p><strong className="mr-sm">Following</strong><span className="mr-sm">Jane Kuhn</span></p>
                                            <p><span className="image-list"><a href="#"><img src="img/user/03.jpg" alt="User" className="img-circle thumb32"/></a><a href="#"><img src="img/user/04.jpg" alt="User" className="img-circle thumb32"/></a><a href="#"><img src="img/user/05.jpg" alt="User" className="img-circle thumb32"/></a><a href="#"><img src="img/user/06.jpg" alt="User" className="img-circle thumb32"/></a><a href="#"><img src="img/user/07.jpg" alt="User" className="img-circle thumb32"/></a><strong><a href="#" className="ml-sm link-unstyled">+200</a></strong></span></p>
                                            <div className="clearfix">
                                                <div className="pull-left text-muted"><em className="ion-android-time mr-sm"></em><span>yesterday</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.user.users,
        profileUser: state.profile.profileUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        profileActions: bindActionCreators(PROFILE_ACTIONS, dispatch),
        userActions: bindActionCreators(USER_ACTIONS, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
