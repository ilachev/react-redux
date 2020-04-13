import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { editChosenMenuPrice } from "../../../../../../../../../../../../../actions";

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

const Price = props => {
    const { chosenMenuId, placeId, price, categoryId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const chosenMenuErrors = useSelector(state => state.project.errors.chosen_menu[chosenMenuId]);

    const handleChosenMenuPriceEdit = useCallback((event) => {
        event.persist();
        dispatch(editChosenMenuPrice(chosenMenuId, categoryId, placeId, event.target.value))
    }, [categoryId, chosenMenuId, dispatch, placeId]);

    return (
        <div className={classes.root}>
            <TextField
                {...rest}
                className={classes.textField}
                fullWidth
                type="number"
                label="Цена"
                name="chosenMenuPrice"
                margin="dense"
                value={price}
                variant="outlined"
                onChange={handleChosenMenuPriceEdit}
                error={!!(chosenMenuErrors && chosenMenuErrors.price)}
                helperText={chosenMenuErrors && chosenMenuErrors.price ? chosenMenuErrors.price : ''}
            />
        </div>
    );
};

Price.propTypes = {
    chosenMenuId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    placeId: PropTypes.number.isRequired,
    price: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    categoryId: PropTypes.number.isRequired,
};

export default Price;