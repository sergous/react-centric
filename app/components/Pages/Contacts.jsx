import React, { PropTypes } from 'react';
import pubsub from 'pubsub-js';
import { Grid, Row, Col, Modal, Button, Dropdown, MenuItem } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as USER_ACTIONS from '../../actions/user';
import { userFilter } from '../../filters/user';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import ContactAboutForm from './ContactAboutForm';

class Contacts extends React.Component {
    componentWillMount() {
        pubsub.publish('setPageTitle', this.constructor.name);
    }

    handleEditAbout() {
        const { Actions, openContact } = this.props;
        Actions.editUserProp('about', openContact.about);
    }

    handleChangeImage(imageSrc) {
        const { Actions } = this.props;
        Actions.changeUser('photo', imageSrc);
    }

    render() {
        const newUser = {};
        const { contacts, Actions, editingContact, openContact,
                isNew, form, editingProp, searchQuery } = this.props;

        const foundContacts = contacts.filter(userFilter(searchQuery));
        const contactsCards = foundContacts.map( (contact, index) => (
                <Col md={4} sm={6} key={index}>
                    <ContactCard contact={ contact } removeUser={Actions.removeUser} editUser={Actions.editUser} openUser={Actions.openUser} />
                </Col>
            )
        );


        const addContactModal = isNew
            ? (
                <Modal  show={editingContact !== null}
                        onHide={() => Actions.closeUser()}
                        className="modal-right modal-auto-size">
                    <Modal.Header closeButton>
                        <Modal.Title>New Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ContactForm onChangeImage={this.handleChangeImage.bind(this)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => Actions.closeUser()}>Cancel</Button>
                        <Button className="btn btn-primary"
                                onClick={() => Actions.addUser(editingContact)}>Save</Button>
                    </Modal.Footer>
                </Modal>
            )
            : null;
        const editContactModal = (editingContact && !isNew)
            ? (
                <Modal  show={editingContact !== null}
                        onHide={() => Actions.closeUser()}
                        className="modal-right modal-auto-size">
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Contact</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ContactForm initialValues={editingContact} onChangeImage={this.handleChangeImage.bind(this)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => Actions.editUser(null)}>Cancel</Button>
                        <Button className="btn btn-primary"
                                onClick={() => Actions.updateUser(editingContact.id, editingContact)}>Save</Button>
                    </Modal.Footer>
                </Modal>
            )
            : null;

        let openContactModal = null;

        if (openContact) {
            const ContactAbout = editingProp
                ? <ContactAboutForm initialValues={openContact}
                                    editUserProp={Actions.editUserProp}
                                    updateOpenUser={Actions.updateOpenUser} />
                : <div className="reader-block" onClick={this.handleEditAbout.bind(this)}>{openContact.about}</div>;
            openContactModal = (
                <Modal  show={openContact !== null}
                        onHide={() => Actions.closeUser()}
                        className="modal-right modal-auto-size">
                    <Modal.Header closeButton>
                        <div className="media m0 pv">
                            <div className="media-left"><a href="#"><img src={openContact.photo || "img/icons/person-stalker.svg"} alt={openContact.name} className="media-object img-circle thumb64"/></a></div>
                            <div className="media-body media-middle">
                                <h4 className="media-heading">{openContact.name}
                                {openContact.position ? <small className="text-muted">{openContact.position}</small> : null }
                                </h4>
                                {openContact.email ? <span className="text-muted">{openContact.email}</span> : null}

                                {openContact.company ? <p className="mt"><em className="ion-briefcase mr-sm"></em>
                                <span>{openContact.company}</span></p> : null}
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        {/* START dropdown */}
                        <div className="pull-right">
                            <Dropdown pullRight id="dd20">
                                <Dropdown.Toggle noCaret className="btn-flat btn-flat-icon">
                                <em className="ion-android-more-vertical"></em>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="md-dropdown-menu" >
                                    <MenuItem eventKey="1" onClick={() => Actions.editUser(openContact)}><em className="ion-edit icon-fw"></em>Edit</MenuItem>
                                    <MenuItem eventKey="2"><em className="ion-star icon-fw"></em>Star</MenuItem>
                                    <MenuItem eventKey="3" onClick={() => Actions.deleteUser(openContact.id)}><em className="ion-trash-a icon-fw"></em>Delete</MenuItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        {/* END dropdown */}

                        {openContact.updatedDatetime
                            ? <p className="text-muted">{openContact.updatedDatetime}</p>
                            : null}
                        <h5 className="mt">About</h5>
                        {ContactAbout}
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="text-left">
                            <p>Send a message to <strong>{openContact.name}</strong></p>
                        </div>
                        <div className="media m0 pv">
                            <div className="media-left"><a href="#"><img src="img/user/01.jpg" alt="User" className="media-object img-circle thumb32"/></a></div>
                            <div className="media-body media-middle">
                                <form action="">
                                    <div className="mda-form-group">
                                        <div className="mda-form-control pt0">
                                            <textarea rows="3" aria-multiline="true" tabIndex="0" aria-invalid="false" placeholder="Write here..." className="form-control"></textarea>
                                            <div className="mda-form-control-line"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal.Footer>
                </Modal>
            )
        }
        const contactModal = addContactModal || editContactModal || openContactModal;

        return (
            <section>
                {contactModal}
                <Grid fluid>
                    <div className="mb-lg text-right">
                        <button type="button" className="btn btn-info" onClick={() => Actions.createUser(newUser)}><em className="ion-plus mr-sm"></em>Add Contact</button>
                    </div>
                    <div className="mb-lg">
                        <form role="form">
                            <div className="mda-form-control">
                                <Field name="query" component="input" type="text" placeholder="Search Name, Job, etc..." className="form-control input-lg" />
                            </div>
                        </form>
                    </div>
                    <Row>
                        {contactsCards}
                    </Row>
                </Grid>
            </section>
        );
    }
}

Contacts.propTypes = {
    contacts: PropTypes.array.isRequired,
    nextId: PropTypes.number.isRequired
};

const mapStateToProps = state => {
    return {
        contacts: state.user.users,
        nextId: state.user.nextId,
        editingContact: state.user.editingUser,
        openContact: state.user.openUser,
        isNew: state.user.isNew,
        form: state.form.user,
        editingProp: state.user.editingProp,
        searchQuery: state.user.searchQuery,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        Actions: bindActionCreators(USER_ACTIONS, dispatch)
    };
}

const contactsForm = {form: 'users'};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(contactsForm)(Contacts));
