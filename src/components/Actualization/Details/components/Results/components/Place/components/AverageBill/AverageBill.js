import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { TableCell, TextField } from '@material-ui/core';
import { changeAverageBill } from "../../../../../../../../../actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 135,
        whiteSpace: 'nowrap',
        lineHeight: '1.7rem',
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(1),
        },
    },
    buttonIcon: {
        marginRight: theme.spacing(1),
        fontSize: '2rem'
    },
}));

const AverageBill = props => {
    const { placeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const averageBill = useSelector(
        state => state.project.placesEntities
            .getIn(['places', placeId, 'average_bill'])
    );
    const averageBillErrors = useSelector(state => state.project.errors.average_bill);

    const handleChangeAverageBill = useCallback((event) => {
        event.persist();
        dispatch(changeAverageBill(placeId, event.target.value))
    }, [dispatch, placeId]);

    return (
        <TableCell
            {...rest}
            className={classes.root}
        >
            <TextField
                {...rest}
                fullWidth
                type="number"
                label="Средний чек"
                name="phone"
                margin="dense"
                onChange={handleChangeAverageBill}
                value={averageBill}
                variant="outlined"
                error={!!averageBillErrors}
                helperText={averageBillErrors ? averageBillErrors : ''}
            />
        </TableCell>
    );
};

AverageBill.propTypes = {
    placeId: PropTypes.number.isRequired,
};

export default AverageBill;