import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, TableCell, TableRow } from "@material-ui/core";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { deleteCuisine } from "../../../../../../../../../actions";
import { Cuisine } from "./components";

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

const PlaceCuisine = props => {
    const { id, placeId } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleCuisineDelete = useCallback(() => {
        dispatch(deleteCuisine(id, placeId))
    }, [dispatch, id, placeId]);

    return (
        <TableRow className={classes.root}>
            <TableCell style={{ width: 300, maxWidth: 300 }}>
                <Cuisine
                    placeCuisineId={id}
                />
            </TableCell>
            <TableCell style={{ width: 100 }}>
                <Button
                    variant="contained"
                    type="button"
                    className={classes.deleteButton}
                    startIcon={<DeleteIcon/>}
                    onClick={handleCuisineDelete}
                >
                    Удалить
                </Button>
            </TableCell>
        </TableRow>
    );
};

PlaceCuisine.displayName = 'PlaceCuisine';

PlaceCuisine.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    placeId: PropTypes.number.isRequired
};

export default PlaceCuisine;