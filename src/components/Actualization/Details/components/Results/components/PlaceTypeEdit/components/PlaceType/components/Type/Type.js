import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { changePlaceType } from "../../../../../../../../../../../actions";

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

const Type = props => {
    const { placeTypeId } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const [value, setValue] = useState({
        id: 0,
        name: ''
    });

    const typeId = useSelector(state => state.project.placesEntities
        .getIn(['placeTypes', placeTypeId, 'type', 'id']));
    const typeOptions = useSelector(state => state.project.placeTypesEntities
        .getIn(['placeTypes'], {}));
    const placeTypeErrors = useSelector(state => state.project.errors.place_types[placeTypeId]);

    const handlePlaceTypeChange = useCallback((event, value) => {
        event.persist && event.persist();
        dispatch(changePlaceType(placeTypeId, value))
    }, [dispatch, placeTypeId]);

    useEffect(() => {
        let active = true;
        if (!typeOptions[typeId]) {
            return undefined;
        }
        if (active) {
            setValue(typeOptions[typeId]);
        }
        return () => {
            active = false;
        }
    }, [typeId, typeOptions]);

    return (
        <div className={classes.root}>
            <Autocomplete
                disableClearable
                size="small"
                classes={{
                    popper: classes.autocomplete
                }}
                onChange={(event, value) =>
                    handlePlaceTypeChange(
                        event,
                        value
                    )
                }
                options={Object.values(typeOptions)}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={option => option.name}
                value={value}
                renderInput={params => (
                    <TextField
                        {...params}
                        className={classes.textField}
                        fullWidth
                        label="Тип"
                        variant="outlined"
                        autoComplete="none"
                        error={!!(placeTypeErrors && placeTypeErrors.type)}
                        helperText={placeTypeErrors && placeTypeErrors.type ? placeTypeErrors.type : ''}
                    />
                )}
            />
        </div>
    );
};

Type.propTypes = {
    placeTypeId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default Type;