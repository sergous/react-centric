import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

class TaskForm extends React.Component {
    render() {
        return (
            <form className="form-validate">
                <div className="row">
                    <div className="col-sm-6 col-md-4">
                        <div className="mda-form-group">
                            <div className="mda-form-control">
                                <Field
                                    component="input"
                                    name="name"
                                    tabIndex="0"
                                    aria-invalid="false"
                                    className="form-control"
                                />
                                <div className="mda-form-control-line" />
                                <label>Name</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="mda-form-group">
                            <div className="mda-form-control">
                                <Field
                                    component="textarea"
                                    name="description"
                                    tabIndex="3"
                                    aria-invalid="false"
                                    className="form-control"
                                />
                                <div className="mda-form-control-line" />
                                <label>Description</label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

TaskForm.propTypes = {
    initialValues: PropTypes.object,
    editTaskProp: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        editingTask: state.task.editingTask,
    }
}

const taskForm = { form: 'task' }

export default connect(mapStateToProps)(reduxForm(taskForm)(TaskForm))
