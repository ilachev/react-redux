import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { changePlaceCuisine } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        '& > *': {
            width: '100%'
        }
    },
    textField: {
        '& .MuiFormHelperText-root': {
            position: 'absolute',
            bottom: '-15px'
        },
    }
}));

const Cuisine = props => {
    const { placeCuisineId } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const [value, setValue] = useState({
        id: 0,
        name: ''
    });

    const cuisineId = useSelector(state => state.project.placesEntities
        .getIn(['cuisines', placeCuisineId, 'cuisine', 'id']));
    const cuisineOptions = useSelector(state => state.project.cuisinesEntities
        .getIn(['cuisines'], {}));
    const cuisineErrors = useSelector(state => state.project.errors.cuisines[placeCuisineId]);

    const handleCuisineChange = useCallback((event, value) => {
        event.persist && event.persist();
        dispatch(changePlaceCuisine(placeCuisineId, value))
    }, [dispatch, placeCuisineId]);

    useEffect(() => {
        let active = true;
        if (!cuisineOptions[cuisineId]) {
            return undefined;
        }
        if (active) {
            setValue(cuisineOptions[cuisineId]);
        }
        return () => {
            active = false;
        }
    }, [cuisineId, cuisineOptions]);

    return (
        <div className={classes.root}>
            <Autocomplete
                disableClearable
                size="small"
                classes={{
                    popper: classes.autocomplete
                }}
                onChange={(event, value) =>
                    handleCuisineChange(
                        event,
                        value
                    )
                }
                options={Object.values(cuisineOptions)}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={option => option.name}
                value={value}
                renderInput={params => (
                    <TextField
                        {...params}
                        className={classes.textField}
                        fullWidth
                        label="Кухня"
                        variant="outlined"
                        autoComplete="none"
                        error={!!(cuisineErrors && cuisineErrors.cuisine)}
                        helperText={cuisineErrors && cuisineErrors.cuisine ? cuisineErrors.cuisine : ''}
                    />
                )}
            />
        </div>
    );
};

Cuisine.propTypes = {
    placeCuisineId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default Cuisine;