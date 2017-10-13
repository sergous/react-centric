import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

function ContactCard(props) {
    return (
        <div className="card">
            <div className="card-body">
                {/* START dropdown */}
                <div className="pull-right dropdown visible-lg visible-md">
                    <button type="button" data-toggle="dropdown" className="btn btn-flat btn-flat-icon"><em className="ion-android-more-vertical"></em></button>
                    <ul role="menu" className="dropdown-menu md-dropdown-menu dropdown-menu-right">
                        <li><a href="" onClick={() => props.editUser(props.contact)}>Edit</a></li>
                        <li><a href="">Block</a></li>
                        <li><a href="" onClick={() => props.removeUser(props.contact.id)}>Delete</a></li>
                    </ul>
                </div>
                {/* END dropdown */}
                <div onClick={() => props.openUser(props.contact)}>
                    <Row>
                        <Col lg={4} md={8}><a href=""><img src={props.contact.photo || "img/icons/person-stalker.svg"} alt={props.contact.name} className="fw img-responsive" /></a></Col>
                    </Row>
                    <h5>{props.contact.name}<small className="text-muted">{props.contact.position}</small></h5>
                    <p className="mt"><em className="ion-briefcase mr-sm"></em><span>{props.contact.company}</span></p>
                    <p className="mt">{props.contact.about}</p>
                </div>
            </div>
            <div className="card-footer text-center">
                <button type="button" className="btn btn-default btn-xs"><em className="ion-email icon-lg icon-fw"></em></button>
                <button type="button" className="btn btn-default btn-xs"><em className="ion-social-facebook icon-lg icon-fw"></em></button>
                <button type="button" className="btn btn-default btn-xs"><em className="ion-social-twitter icon-lg icon-fw"></em></button>
                <button type="button" className="btn btn-default btn-xs"><em className="ion-social-linkedin icon-lg icon-fw"></em></button>
                <button type="button" className="btn btn-default btn-xs"><em className="ion-social-skype icon-lg icon-fw"></em></button>
            </div>
        </div>
    )
}

ContactCard.propTypes = {
    contact: PropTypes.object.isRequired,
    removeUser: PropTypes.func.isRequired,
    editUser: PropTypes.func.isRequired
}

export default ContactCard;