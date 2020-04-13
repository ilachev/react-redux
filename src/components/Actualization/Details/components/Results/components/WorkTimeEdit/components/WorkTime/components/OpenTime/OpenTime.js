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
import { editOpenTime } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 140
    },
}));

const OpenTime = props => {
    const { workTimeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const openTime = useSelector(state => state.project.placesEntities.getIn(['workTime', workTimeId, 'openTime']));

    const handleChangeOpenTime = useCallback((openTime) => {
        dispatch(editOpenTime(workTimeId, openTime))
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

OpenTime.propTypes = {
    workTimeId: PropTypes.number.isRequired,
};

export default OpenTime;