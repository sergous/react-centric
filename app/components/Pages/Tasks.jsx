import React from 'react'
import pubsub from 'pubsub-js'
import { Grid, Row, Col, Modal, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import Nestable from 'react-nestable'
import * as TASK_ACTIONS from '../../actions/task'
import TaskListItem from './TaskListItem'
import TaskForm from './TaskForm'

import './Tasks.scss'
import { bindActionCreators } from 'redux'

class Tasks extends React.Component {
    componentWillMount() {
        pubsub.publish('setPageTitle', this.constructor.name)
    }

    renderTask({ openTask }) {
        return ({ item: task, collapseIcon }) =>
            task && (
                <TaskListItem
                    task={task}
                    key={task.id}
                    onOpen={openTask}
                    collapseIcon={collapseIcon}
                />
            )
    }

    renderCollapseIcon({ isCollapsed }) {
        const direction = isCollapsed ? 'down' : 'up'
        return <i className={`ion-chevron-${direction}`} />
    }

    render() {
        const newTask = {}
        const {
            tasks,
            isCollapsed,
            isNew,
            editingTask,
            openTask,
            Actions,
        } = this.props

        const addTaskModal = isNew ? (
            <Modal
                show={editingTask !== null}
                onHide={() => Actions.closeTask()}
                className="modal-right modal-auto-size"
            >
                <Modal.Header closeButton>
                    <Modal.Title>New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TaskForm
                        initialValues={newTask}
                        editTaskProp={Actions.editTaskProp}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => Actions.closeTask()}>Cancel</Button>
                    <Button
                        className="btn btn-primary"
                        onClick={() => Actions.addTask(editingTask)}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        ) : null

        const editTaskModal =
            editingTask && !isNew ? (
                <Modal
                    show={editingTask !== null}
                    onHide={() => Actions.closeTask()}
                    className="modal-right modal-auto-size"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <TaskForm
                            initialValues={editingTask}
                            editProjectProp={Actions.editTaskProp}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => Actions.openTask(editingTask)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => Actions.removeTask(editingTask.id)}
                        >
                            Remove
                        </Button>
                        <Button
                            className="btn btn-primary"
                            onClick={() =>
                                Actions.updateTask(editingTask.id, editingTask)
                            }
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : null

        let openTaskModal = null
        if (openTask) {
            openTaskModal = (
                <Modal
                    show={openTask !== null}
                    onHide={() => Actions.closeTask()}
                    className="modal-right modal-auto-size"
                >
                    <Modal.Header closeButton />
                    <Modal.Body>
                        <h3>{openTask.name}</h3>
                        <h4>{openTask.description}</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => Actions.closeTask()}>
                            Close
                        </Button>
                        <Button onClick={() => Actions.editTask(openTask)}>
                            Edit
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
        }

        const taskModal = addTaskModal || editTaskModal || openTaskModal

        return (
            <section>
                {taskModal}
                <Grid fluid>
                    <Row className="mv">
                        <Col sm={6}>
                            <button
                                type="button"
                                className="btn btn-info"
                                onClick={() => Actions.createTask(newTask)}
                            >
                                <em className="ion-plus mr-sm" />
                                Add Task
                            </button>
                        </Col>
                        <Col sm={6}>
                            <div className="js-nestable-action pull-right">
                                <a
                                    onClick={() => Actions.collapseTasks(true)}
                                    className="btn btn-default btn-sm mr-sm"
                                >
                                    Expand All
                                </a>
                                <a
                                    onClick={() => Actions.collapseTasks(false)}
                                    className="btn btn-default btn-sm"
                                >
                                    Collapse All
                                </a>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div id="nestable" className="dd">
                                <ol className="dd-list">
                                    <Nestable
                                        collapsed={isCollapsed}
                                        onChange={updTasks =>
                                            Actions.reorderTasks(updTasks)
                                        }
                                        items={tasks}
                                        renderItem={this.renderTask({
                                            openTask: Actions.openTask,
                                        })}
                                        renderCollapseIcon={
                                            this.renderCollapseIcon
                                        }
                                    />
                                </ol>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.task.tasks,
        isCollapsed: state.task.isCollapsed,
        isNew: state.task.isNew,
        editingTask: state.task.editingTask,
        openTask: state.task.openTask,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        Actions: bindActionCreators(TASK_ACTIONS, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Tasks)
