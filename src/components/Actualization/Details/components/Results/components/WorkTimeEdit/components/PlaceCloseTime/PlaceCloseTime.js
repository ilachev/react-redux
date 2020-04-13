import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    TableCell
} from '@material-ui/core';
import {
    KeyboardTimePicker,
} from '@material-ui/pickers';
import 'date-fns';
import { useDispatch } from "react-redux";
import { editPlaceCloseTime } from "../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 140
    },
}));

const PlaceCloseTime = props => {
    const { placeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const [closeTime, setCloseTime] = useState(null);

    const handleChangeCloseTime = useCallback((closeTime) => {
        setCloseTime(closeTime);
        dispatch(editPlaceCloseTime(placeId, closeTime))
    }, [dispatch, placeId]);

    return (
        <TableCell
            {...rest}
            className={classes.root}
        >
            <div>
                <KeyboardTimePicker
                    margin="normal"
                    label="Время"
                    ampm={false}
                    value={closeTime}
                    onChange={handleChangeCloseTime}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </div>
        </TableCell>
    );
};

PlaceCloseTime.propTypes = {
    placeId: PropTypes.number.isRequired,
};

export default PlaceCloseTime;