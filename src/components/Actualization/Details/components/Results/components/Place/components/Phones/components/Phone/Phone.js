import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import { makeStyles } from '@material-ui/styles';
import {
    IconButton,
    TextField
} from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deletePhone, changePhone } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    deleteButton: {
        marginRight: theme.spacing(1)
    }
}));

const phoneMask = props => {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[
                /[0-9+]/, /[0-9]/, /[0-9 ]/, /[(-]/, /[0-9]/, /[0-9)]/, /[0-9-]/, /[0-9)]/, /[0-9 ]/, /[0-9]/,
                /[0-9]/, /[0-9]/, /[-]/, /[0-9]/, /[0-9]/, /[-]/, /[0-9]/, /[0-9]/,
            ]}
            keepCharPositions={true}
            placeholderChar={'\u2000'}
        />
    );
};

const Phone = props => {
    const { id, placeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const phone = useSelector(state => state.project.placesEntities.getIn(['phones', id, 'number']));
    const phoneErrors = useSelector(state => state.project.errors.phones[id]);

    const handleDeletePhone = useCallback(() => {
        dispatch(deletePhone(id, placeId))
    }, [dispatch, id, placeId]);

    const handleChangePhone = useCallback((event) => {
        event.persist();
        dispatch(changePhone(id, event.target.value))
    }, [dispatch, id]);

    return (
        <div className={classes.root}>
            <div>
                <IconButton
                    className={classes.deleteButton}
                    size="small"
                    onClick={handleDeletePhone}
                >
                    <DeleteIcon fontSize="small" />
                </IconButton>
            </div>

            <TextField
                {...rest}
                fullWidth
                label="Телефон"
                name="phone"
                margin="dense"
                onChange={handleChangePhone}
                value={phone}
                variant="outlined"
                InputProps={{
                    inputComponent: phoneMask
                }}
                error={!!phoneErrors}
                helperText={phoneErrors ? phoneErrors[0] : ''}
            />
        </div>
    );
};

Phone.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    placeId: PropTypes.number.isRequired
};

export default Phone;