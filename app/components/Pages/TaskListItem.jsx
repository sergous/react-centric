import React from 'react';
export default ({ task, collapseIcon }) => (
    <div className="dd-item">
        <div className="card b0 dd-handle">
            <div className="mda-list">
                <div className="mda-list-item">
                    <div className="mda-list-item-icon item-grab">
                        <em className="ion-drag icon-lg" />
                    </div>
                    <div className="mda-list-item-icon bg-info">
                        <em className="ion-task icon-lg" />
                    </div>
                    <div className="mda-list-item-text mda-2-line">
                        <h3>{task.name}</h3>
                        <h4>{task.description}</h4>
                    </div>
                    <div className="mda-list-item-icon pull-right">
                        {collapseIcon}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
