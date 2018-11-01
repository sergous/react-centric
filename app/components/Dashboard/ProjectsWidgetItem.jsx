import React from 'react';
import { PROJECT_STATUS, mapStatusToStyle } from '../../constants/project';
import {Label} from 'react-bootstrap';

export default ({project}) => {
    const trendClass = project.status === PROJECT_STATUS.ACTIVE
        ? 'ion-arrow-graph-up-right text-success'
        : 'ion-arrow-graph-down-right text-warning';
    const labelStyle = mapStatusToStyle[project.status];

    return (
        <tr>
            <td>
                <p className="m0">{project.name}<br/><small className="text-thin">{project.description}</small></p>
            </td>
            <td className="va-middle">
                <div data-percent={project.progress} 
                    className="dashboard-easypiechartProject easypie-chart block-center">
                    <small className="percentage">{project.progress}</small>
                </div>
            </td>
            <td className="va-middle">  
                <Label bsStyle={labelStyle}>{project.status}</Label>
            </td>
            <td className="text-right va-middle"><em className={trendClass}></em></td>
        </tr>
    )
}