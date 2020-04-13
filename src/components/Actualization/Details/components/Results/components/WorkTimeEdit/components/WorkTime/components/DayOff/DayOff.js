import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Checkbox,
    FormControlLabel,
    TableCell
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { toggleDayOff } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {},
    checkbox: {
        padding: 3
    },
}));

const DayOff = props => {
    const { workTimeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const dayOff = useSelector(state => state.project.placesEntities.getIn(['workTime', workTimeId, 'dayOff']));

    const handleToggleDayOff = useCallback((event) => {
        dispatch(toggleDayOff(workTimeId, event.target.checked))
    }, [dispatch, workTimeId]);

    return (
        <TableCell
            {...rest}
            className={classes.root}
        >
            <div>
                <FormControlLabel
                    control={
                        <Checkbox
                            className={classes.checkbox}
                            checked={dayOff}
                            value={dayOff}
                            onChange={handleToggleDayOff}
                            color="primary"
                        />
                    }
                    label={`Выходной`}
                />
            </div>
        </TableCell>
    );
};

DayOff.propTypes = {
    workTimeId: PropTypes.number.isRequired,
};

export default DayOff;