import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Nouislider from 'react-nouislider';
import { Field, reduxForm } from 'redux-form';
import {PROJECT_STATUS} from '../../constants/project';

class ProjectForm extends React.Component {
    render() {
        const {initialValues, editProjectProp, editingProject} = this.props;
        const {progress} = editingProject || initialValues;
        const statusOptions = Object.keys(PROJECT_STATUS).map(key => (
            <option value={PROJECT_STATUS[key]} key={key}>
                {PROJECT_STATUS[key].replace(/^./, l => l.toUpperCase())}
            </option>
        ));
        return (
            <form className="form-validate">
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
                                <Field component="input" name="category"
                                    tabIndex="1" aria-invalid="false" className="form-control" />
                                <div className="mda-form-control-line"></div>
                                <label>Category</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4">
                        <div className="mda-form-group">
                            <div className="mda-form-control">
                                <Field component="select" name="status" className="form-control" tabIndex="2">
                                    <option value=""></option>
                                    {statusOptions}
                                </Field>
                                <div className="mda-form-control-line"></div>
                                <label>Status</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="mda-form-group">
                            <div className="mda-form-control">
                                <p>Progress</p>
                                <div className="mb-sm" style={{position:'relative'}}>
                                    <Nouislider range={{min: 0, max: 100}} start={[progress]}
                                                onChange={([value]) => editProjectProp('progress', Math.floor(value))} connect="lower" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="mda-form-group">
                            <div className="mda-form-control">
                                <Field component="textarea" name="description"
                                    tabIndex="3" aria-invalid="false" className="form-control" />
                                <div className="mda-form-control-line"></div>
                                <label>Description</label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

ProjectForm.propTypes = {
    initialValues: PropTypes.object,
    editProjectProp: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        editingProject: state.project.editingProject
    }
}

const projectForm = {form: 'project'};

export default connect(mapStateToProps)(reduxForm(projectForm)(ProjectForm));