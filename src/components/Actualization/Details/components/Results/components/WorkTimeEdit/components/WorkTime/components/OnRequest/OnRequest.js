import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Checkbox,
    FormControlLabel,
    TableCell
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { toggleOnRequest } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {},
    checkbox: {
        padding: 3
    },
}));

const OnRequest = props => {
    const { workTimeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const onRequest = useSelector(state => state.project.placesEntities.getIn(['workTime', workTimeId, 'onRequest']));

    const handleToggleOnRequest = useCallback((event) => {
        dispatch(toggleOnRequest(workTimeId, event.target.checked))
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
                            checked={onRequest}
                            value={onRequest}
                            onChange={handleToggleOnRequest}
                            color="primary"
                        />
                    }
                    label={`Под заказ`}
                />
            </div>
        </TableCell>
    );
};

OnRequest.propTypes = {
    workTimeId: PropTypes.number.isRequired,
};

export default OnRequest;