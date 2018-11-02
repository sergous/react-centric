import React from 'react'
import pubsub from 'pubsub-js'
import TaskListItem from './TaskListItem'
import { connect } from 'react-redux'
import * as TASK_ACTIONS from '../../actions/task'
import Nestable from 'react-nestable'

import './Tasks.scss'
import { bindActionCreators } from 'redux'

class Tasks extends React.Component {
    componentWillMount() {
        pubsub.publish('setPageTitle', this.constructor.name)
    }

    renderTask({ item: task, collapseIcon }) {
        return (
            task && (
                <TaskListItem
                    task={task}
                    key={task.id}
                    collapseIcon={collapseIcon}
                />
            )
        )
    }

    renderCollapseIcon({ isCollapsed }) {
        const direction = isCollapsed ? 'down' : 'up'
        return <i className={`ion-chevron-${direction}`} />
    }

    render() {
        const {
            tasks,
            isCollapsed,
            Actions: { reorderTasks, collapseTasks },
        } = this.props
        return (
            <section>
                <div className="container-fluid">
                    <div className="js-nestable-action">
                        <a
                            onClick={() => collapseTasks(true)}
                            className="btn btn-default btn-sm mr-sm"
                        >
                            Expand All
                        </a>
                        <a
                            onClick={() => collapseTasks(false)}
                            className="btn btn-default btn-sm"
                        >
                            Collapse All
                        </a>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div id="nestable" className="dd">
                                <ol className="dd-list">
                                    <Nestable
                                        collapsed={isCollapsed}
                                        onChange={updTasks =>
                                            reorderTasks(updTasks)
                                        }
                                        items={tasks}
                                        renderItem={this.renderTask}
                                        renderCollapseIcon={
                                            this.renderCollapseIcon
                                        }
                                    />
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.task.tasks,
        isCollapsed: state.task.isCollapsed,
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
