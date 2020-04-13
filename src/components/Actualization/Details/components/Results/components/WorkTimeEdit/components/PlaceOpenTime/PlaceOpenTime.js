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
import { editPlaceOpenTime } from "../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 140
    },
}));

const PlaceOpenTime = props => {
    const { placeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const [openTime, setOpenTime] = useState(null);

    const handleChangeOpenTime = useCallback((openTime) => {
        setOpenTime(openTime);
        dispatch(editPlaceOpenTime(placeId, openTime))
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
                    value={openTime}
                    onChange={handleChangeOpenTime}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </div>
        </TableCell>
    );
};

PlaceOpenTime.propTypes = {
    placeId: PropTypes.number.isRequired,
};

export default PlaceOpenTime;