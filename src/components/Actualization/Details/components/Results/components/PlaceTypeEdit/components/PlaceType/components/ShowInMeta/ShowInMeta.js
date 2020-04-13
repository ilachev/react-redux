import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Checkbox } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { toggleShowInMeta } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    showInMeta: {
        padding: 3
    }
}));

const ShowInMeta = props => {
    const { placeTypeId } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const checked = useSelector(
        state => state.project.placesEntities
            .getIn(['placeTypes', placeTypeId, 'showInMeta'], false)
    );

    const handleToggleShowInMeta = useCallback(() => {
        dispatch(toggleShowInMeta(placeTypeId, !checked));
    }, [dispatch, placeTypeId, checked]);

    return (
        <div className={classes.root}>
            <Checkbox
                className={classes.showInMeta}
                checked={checked}
                onChange={handleToggleShowInMeta}
                value={checked}
                color="primary"
            />
        </div>
    );
};

ShowInMeta.propTypes = {
    placeTypeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default ShowInMeta;