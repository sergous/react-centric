import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Carousel } from 'react-bootstrap';

class ContactForm extends React.Component {
    handleImageSelect(index) {
        const { userImages } = this.props;
        this.props.onChangeImage(userImages[index].src);
    }
    render() {
        const { userImages, editingUser } = this.props;
        const carouselItems = userImages.map( (image, index) => (
                <Carousel.Item key={index}>
                <img width={image.width} height={image.height} alt={image.alt} src={image.src} />
                </Carousel.Item>
            )
        )
        let carouselIndex = 0;
        if (editingUser && editingUser.photo) {
            userImages.forEach( (image, index) => {
                if (image.src !== editingUser.photo) return;

                carouselIndex = index;
            });
        }
        return (
            <form className="form-validate">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <Carousel interval={0} activeIndex={carouselIndex} onSelect={this.handleImageSelect.bind(this)}>
                            {carouselItems}
                        </Carousel>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6 col-md-4">
                        <div className="mda-form-group">
                            <div className="mda-form-control">
                                <Field component="input" name="name"
                                       tabIndex="0" aria-invalid="false" className="form-control" />
                                <div className="mda-form-control-line"></div>
                                <label>Name</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="mda-form-group">
                            <div className="mda-form-control">
                                <Field component="input" name="company"
                                    tabIndex="1" aria-invalid="false" className="form-control" />
                                <div className="mda-form-control-line"></div>
                                <label>Company</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="mda-form-group">
                            <div className="mda-form-control">
                                <Field component="input" name="position"
                                    tabIndex="2" aria-invalid="false" className="form-control" />
                                <div className="mda-form-control-line"></div>
                                <label>Position</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="mda-form-group">
                            <div className="mda-form-control">
                                <Field component="textarea" name="about"
                                    tabIndex="3" aria-invalid="false" className="form-control" />
                                <div className="mda-form-control-line"></div>
                                <label>About</label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

ContactForm.propTypes = {
    initialValues: PropTypes.object,
    onChangeImage: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        editingUser: state.user.editingUser,
        userImages: state.user.userImages,
    }
}

const userForm = {form: 'user'};

export default connect(mapStateToProps)(reduxForm(userForm)(ContactForm));