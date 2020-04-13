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
import { editKitchenOpenTime } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 140
    },
}));

const KitchenOpenTime = props => {
    const { workTimeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const kitchenOpenTime = useSelector(state => state.project.placesEntities.getIn(['workTime', workTimeId, 'kitchenOpenTime']));

    const handleChangeKitchenOpenTime = useCallback((kitchenOpenTime) => {
        dispatch(editKitchenOpenTime(workTimeId, kitchenOpenTime))
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
                    value={kitchenOpenTime}
                    onChange={handleChangeKitchenOpenTime}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </div>
        </TableCell>
    );
};

KitchenOpenTime.propTypes = {
    workTimeId: PropTypes.number.isRequired,
};

export default KitchenOpenTime;