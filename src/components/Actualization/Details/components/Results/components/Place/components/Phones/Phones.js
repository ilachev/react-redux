import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    IconButton,
    TableCell,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Phone } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { addPhone } from "../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 230
    },
    phonesCell: {
        display: 'flex',
        flexFlow: 'column'
    },
}));

const Phones = props => {
    const { placeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const phoneIds = useSelector(state => state.project.placesEntities.getIn(['places', placeId, 'phones']));

    const handleAddPhone = useCallback(() => {
        dispatch(addPhone(placeId))
    }, [dispatch, placeId]);

    return (
        <TableCell
            {...rest}
            className={classes.root}
        >
            <div className={classes.phonesCell}>
                {phoneIds.map((id) => (
                    <Phone
                        key={id}
                        id={id}
                        placeId={placeId}
                    />
                ))}
                <div>
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={handleAddPhone}
                    >
                        <AddIcon fontSize="small" />
                    </IconButton>
                </div>
            </div>

        </TableCell>
    );
};

Phones.propTypes = {
    placeId: PropTypes.number.isRequired,
};

export default Phones;