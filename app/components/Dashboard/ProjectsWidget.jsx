import React from 'react';
import ProjectsWidgetItem from './ProjectsWidgetItem'; 

export default ({projects, onOpen}) => {
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Completion</th>
                        <th>Status</th>
                        <th className="text-right">Trend</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => <ProjectsWidgetItem project={project} key={project.id} onOpen={onOpen} />)}
                </tbody>
            </table>
        </div>
    )
}