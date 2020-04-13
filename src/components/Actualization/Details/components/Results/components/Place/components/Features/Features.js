import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    TableCell
} from '@material-ui/core';
import { Feature } from "./components";
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        width: 250
    },
    deleteButton: {
        marginRight: theme.spacing(1)
    }
}));

const Features = props => {
    const { placeId, ...rest } = props;

    const classes = useStyles();
    const featureIds = useSelector(state => state.project.featuresResult);

    return (
        <TableCell
            {...rest}
        >
            <div className={classes.phonesCell}>
                {featureIds.map(id => (
                    <Feature
                        key={id}
                        id={id}
                        placeId={placeId}
                    />
                ))}
            </div>

        </TableCell>
    );
};

Features.propTypes = {
    placeId: PropTypes.number.isRequired,
};


export default Features;