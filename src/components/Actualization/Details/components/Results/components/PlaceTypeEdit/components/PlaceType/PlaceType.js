import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, TableCell, TableRow } from "@material-ui/core";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { deletePlaceType } from "../../../../../../../../../actions";
import { ShowInMeta, Type } from "./components";

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: 1400,
        backgroundColor: theme.palette.white,
        cursor: 'pointer',
        '& > *': {
            padding: theme.spacing(2),
            verticalAlign: 'middle'
        }
    },
    deleteButton: {
        color: theme.palette.white,
        backgroundColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        }
    },
}));

const PlaceType = props => {
    const { id, placeId } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const handlePlaceTypeDelete = useCallback(() => {
        dispatch(deletePlaceType(id, placeId))
    }, [dispatch, id, placeId]);

    return (
        <TableRow className={classes.root}>
            <TableCell style={{ width: 400 }}>
                <ShowInMeta
                    placeTypeId={id}
                />
            </TableCell>
            <TableCell style={{ width: 300, maxWidth: 300 }}>
                <Type
                    placeTypeId={id}
                />
            </TableCell>
            <TableCell style={{ width: 100 }}>
                <Button
                    variant="contained"
                    type="button"
                    className={classes.deleteButton}
                    startIcon={<DeleteIcon/>}
                    onClick={handlePlaceTypeDelete}
                    // disabled={!(name.length || price.length)}
                >
                    Удалить
                </Button>
            </TableCell>
        </TableRow>
    );
};

PlaceType.displayName = 'PlaceType';

PlaceType.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    placeId: PropTypes.number.isRequired
};

export default PlaceType;