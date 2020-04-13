import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { editChosenMenuName } from "../../../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    textField: {
        '& .MuiFormHelperText-root': {
            position: 'absolute',
            bottom: '-15px'
        },
    }
}));

const Name = props => {
    const { chosenMenuId, placeId, name, categoryId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const chosenMenuErrors = useSelector(state => state.project.errors.chosen_menu[chosenMenuId]);

    const handleChosenMenuNameEdit = useCallback((event) => {
        event.persist();
        dispatch(editChosenMenuName(chosenMenuId, categoryId, placeId, event.target.value))
    }, [categoryId, chosenMenuId, dispatch, placeId]);

    return (
        <div className={classes.root}>
            <TextField
                {...rest}
                className={classes.textField}
                fullWidth
                label="Название"
                name="chosenMenuName"
                margin="dense"
                value={name}
                variant="outlined"
                onChange={handleChosenMenuNameEdit}
                error={!!(chosenMenuErrors && chosenMenuErrors.name)}
                helperText={chosenMenuErrors && chosenMenuErrors.name ? chosenMenuErrors.name : ''}
            />
        </div>
    );
};

Name.propTypes = {
    chosenMenuId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    placeId: PropTypes.number.isRequired,
    name: PropTypes.string,
    categoryId: PropTypes.number.isRequired,
};

export default Name;