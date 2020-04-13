import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    TableCell
} from '@material-ui/core';
import {
    KeyboardTimePicker,
} from '@material-ui/pickers';
import 'date-fns';
import { useDispatch, useSelector } from "react-redux";
import { editCloseTime } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 140
    },
}));

const CloseTime = props => {
    const { workTimeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const closeTime = useSelector(state => state.project.placesEntities.getIn(['workTime', workTimeId, 'closeTime']));

    const handleChangeCloseTime = useCallback((closeTime) => {
        dispatch(editCloseTime(workTimeId, closeTime))
    }, [dispatch, workTimeId]);

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

CloseTime.propTypes = {
    workTimeId: PropTypes.number.isRequired,
};

export default CloseTime;