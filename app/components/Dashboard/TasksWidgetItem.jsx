import React from 'react'

export default ({ task, onOpen }) =>
    task && (
        <a
            onClick={() => onOpen(task)}
            className="list-group-item bt0"
            key={task.id}
        >
            <span className="text-sm">{task.name}</span>
            <span className="pull-right">
                <em className="ion-ios-arrow-right" />
            </span>
        </a>
    )
