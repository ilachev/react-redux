import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Checkbox,
    FormControlLabel
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { addFeature, deleteFeature } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {},
    featureCheckbox: {
        padding: 3
    }
}));

const Feature = props => {
    const { id, placeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const featureName = useSelector(
        state => state.project.featuresEntities.getIn(['features', id, 'name'])
    );
    const featureIds = useSelector(
        state => state.project.placesEntities
            .getIn(['places', placeId, 'features'])
    );

    const checked = !!featureIds.find(el => el === id);

    const handleToggleFeature = useCallback(() => {
        checked ? dispatch(deleteFeature(id, placeId)) : dispatch(addFeature(id, placeId));
    }, [dispatch, id, placeId, checked]);

    return (
        <div
            {...rest}
            className={classes.root}
        >
            <FormControlLabel
                control={
                    <Checkbox
                        className={classes.featureCheckbox}
                        checked={checked}
                        onChange={handleToggleFeature}
                        value={checked}
                        color="primary"
                    />
                }
                label={featureName}
            />
        </div>
    );
};

Feature.propTypes = {
    placeId: PropTypes.number.isRequired,
};

export default Feature;