import React, {PropTypes} from 'react';
import {mapStatusToStyle} from '../../constants/project';
import {ProgressBar, Label, Dropdown, MenuItem} from 'react-bootstrap';

export function ProjectCard(props) {
    const {editProject, removeProject, openProject, openUser, project} = props;
    const {name, status, category, description, members, progress, stats} = project;
    const {issues, posts, tests} = stats ? stats : {};
    const projectMembers = members ? members.map( user => (
            <a onClick={() => openUser && openUser(user)} className="inline" key={user.id}>
                <img src={user.photo} alt={user.name} className="img-circle thumb32"/>
            </a>
        )
    ) : null;
    const progressStyle = mapStatusToStyle[status];
    const labelStyle = mapStatusToStyle[status];
    return (
        <div className="card">
            <div className="card-heading">
                <div className="pull-right">
                    <Label bsStyle={labelStyle}>{status}</Label>
                    {/* START dropdown */}
                    <span>
                        <Dropdown pullRight id="dd20">
                            <Dropdown.Toggle noCaret className="btn-flat btn-flat-icon">
                            <em className="ion-android-more-vertical"></em>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="md-dropdown-menu" >
                                <MenuItem eventKey="1" onClick={() => editProject(project)}><em className="ion-edit icon-fw"></em>Edit</MenuItem>
                                <MenuItem eventKey="2"><em className="ion-star icon-fw"></em>Star</MenuItem>
                                <MenuItem eventKey="3" onClick={() => removeProject(project.id)}><em className="ion-trash-a icon-fw"></em>Delete</MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </span>
                    {/* END dropdown */}
                </div>
                <div className="card-title">{name}</div><small>{category}</small>
            </div>
            <div className="card-body" onClick={() => openProject && openProject(project)}>
                {description
                    ? <section>
                        <p><strong>Description:</strong></p>
                        <div className="pl-lg mb-lg">{description}</div>
                      </section>
                    : null}
                {projectMembers
                    ? <section><p><strong>Members:</strong></p>
                        <div className="pl-lg mb-lg">
                            {projectMembers}
                        </div>
                      </section>
                    : null}
                {issues || posts || tests ? <section>
                    <p><strong>Activity:</strong></p>
                    <div className="pl-lg">
                        <ul className="list-inline m0">
                            {issues ? <li className="mr">
                                <h4 className="m0">{issues}</h4>
                                <p className="text-muted">Issues</p>
                            </li> : null}
                            {posts ? <li className="mr">
                                <h4 className="m0">{posts}</h4>
                                <p className="text-muted">Posts</p>
                            </li> : null}
                            {tests ? <li>
                                <h4 className="m0">{tests}</h4>
                                <p className="text-muted">Tests</p>
                            </li> : null}
                        </ul>
                    </div>
                </section> : null}
            </div>
            {progress ? <div className="card-footer">
                <p><small>{progress}%</small></p>
                <ProgressBar now={progress} bsStyle={progressStyle} className="progress-xs m0"/>
            </div> : null}
        </div>
    )
}

ProjectCard.PropTypes = {
    project: PropTypes.any.isRequired,
    editProject: PropTypes.func.isRequired,
    removeProject: PropTypes.func.isRequired,
    openProject: PropTypes.func,
    openUser: PropTypes.func
}

export default ProjectCard;
