import React from 'react';
import PropTypes from 'prop-types';
import {
    Link,
    TableCell,
    TableRow
} from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import moment from "moment";

const Project = props => {
    const { id, name, createdAt, slug, rate, ...rest } = props;

    return (
        <TableRow
            hover
            {...rest}
        >
            <TableCell>{id}</TableCell>
            <TableCell>{moment(createdAt).format('DD/MM/YY')}</TableCell>
            <TableCell>
                <Link
                    component={RouterLink}
                    to={`/admin/actualization/projects/${slug}/${id}`}
                    variant="h6"
                >
                    {name}
                </Link>
            </TableCell>
            <TableCell>{rate}</TableCell>
        </TableRow>
    );
};

Project.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    rate: PropTypes.string.isRequired,
};

Project.defaultProps = {
    rate: '0%',
};

export default Project;