import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Checkbox,
    FormControlLabel,
    TableCell
} from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { toggleLastClient } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {},
    checkbox: {
        padding: 3
    },
}));

const LastClient = props => {
    const { workTimeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const lastClient = useSelector(state => state.project.placesEntities.getIn(['workTime', workTimeId, 'lastClient']));

    const handleToggleLastClient = useCallback((event) => {
        dispatch(toggleLastClient(workTimeId, event.target.checked))
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
                            checked={lastClient}
                            value={lastClient}
                            onChange={handleToggleLastClient}
                            color="primary"
                        />
                    }
                    label={`До последнего клиента`}
                />
            </div>
        </TableCell>
    );
};

LastClient.propTypes = {
    workTimeId: PropTypes.number.isRequired,
};

export default LastClient;