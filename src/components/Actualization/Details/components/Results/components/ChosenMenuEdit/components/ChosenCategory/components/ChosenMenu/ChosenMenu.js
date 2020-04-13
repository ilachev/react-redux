import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, TableCell, TableRow } from "@material-ui/core";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { Name, Price } from "./components";
import moment from "moment";
import { deleteChosenMenu } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            padding: theme.spacing(1),
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

const ChosenMenu = props => {
    const { id, categoryId, placeId, name, price, actualizedAt } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const handleChosenMenuDelete = useCallback(() => {
        dispatch(deleteChosenMenu(id, categoryId, placeId))
    }, [categoryId, dispatch, id, placeId]);

    return (
        <TableRow key={id} className={classes.root}>
            <TableCell style={{ width: 400 }}>
                <Name
                    chosenMenuId={id}
                    placeId={placeId}
                    name={name}
                    categoryId={categoryId}
                />
            </TableCell>
            <TableCell style={{ width: 150 }}>
                <Price
                    chosenMenuId={id}
                    placeId={placeId}
                    price={price}
                    categoryId={categoryId}
                />
            </TableCell>
            <TableCell style={{ width: 300 }}>
                {actualizedAt.length ? moment(actualizedAt).format('DD/MM/YY HH:mm') : ''}
            </TableCell>
            <TableCell style={{ width: 100 }}>
                <Button
                    variant="contained"
                    type="button"
                    className={classes.deleteButton}
                    startIcon={<DeleteIcon/>}
                    disabled={!(name.length || price.length)}
                    onClick={handleChosenMenuDelete}
                >
                    Удалить
                </Button>
            </TableCell>
        </TableRow>
    );
};

ChosenMenu.displayName = 'ChosenMenu';

ChosenMenu.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    categoryId: PropTypes.number.isRequired,
    placeId: PropTypes.number.isRequired,
    name: PropTypes.string,
    price: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    actualizedAt: PropTypes.string,
};

export default ChosenMenu;