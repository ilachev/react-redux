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
import { editKitchenCloseTime } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 140
    },
}));

const KitchenCloseTime = props => {
    const { workTimeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const kitchenCloseTime = useSelector(state => state.project.placesEntities.getIn(['workTime', workTimeId, 'kitchenCloseTime']));

    const handleChangeKitchenCloseTime = useCallback((kitchenCloseTime) => {
        dispatch(editKitchenCloseTime(workTimeId, kitchenCloseTime))
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
                    value={kitchenCloseTime}
                    onChange={handleChangeKitchenCloseTime}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </div>
        </TableCell>
    );
};

KitchenCloseTime.propTypes = {
    workTimeId: PropTypes.number.isRequired,
};

export default KitchenCloseTime;