import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';

class ContactAboutForm extends React.Component {
    handleClose() {
        this.props.editUserProp();
    }
    handleSubmit(event) {
        event.preventDefault();
        const { editingProp, updateOpenUser } = this.props;
        updateOpenUser('about', editingProp.value);
        this.handleClose();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="mda-form-group">
                    <div className="mda-form-control pt0">
                        <Field name="about" component="textarea" rows="3" aria-multiline="true" tabIndex="0" aria-invalid="false" placeholder="Write here..." className="form-control" />
                        <div className="mda-form-control-line"></div>
                    </div>
                </div>
                <div className="mda-form-group">
                    <Button bsStyle="default" className="mr mb-sm ripple"
                            onClick={this.handleClose.bind(this)}>Chancel</Button>
                    <Button bsStyle="primary" className="mr mb-sm ripple"
                            type="submit">Save</Button>
                </div>
            </form>
        )
    }
}

ContactAboutForm.propTypes = {
    initialValues: PropTypes.object.isRequired,
    editUserProp: PropTypes.func.isRequired,
    updateOpenUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        editingProp: state.user.editingProp
    }
}

const userForm = {form: 'user'};

export default connect(mapStateToProps)(reduxForm(userForm)(ContactAboutForm));