import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, TableCell, TableRow } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import { Media, Name, Rubrics } from "./components";
import moment from "moment";
import { deleteMenuFile } from "../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        zIndex: 1400,
        backgroundColor: theme.palette.white,
        cursor: 'pointer',
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

const MenuFile = props => {
    const { id, placeId } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const actualizedAt = useSelector(state => state.project.placesEntities.getIn(['menuFiles', id, 'actualizedAt'], ''));

    const handleMenuFileDelete = useCallback(() => {
        dispatch(deleteMenuFile(id, placeId))
    }, [dispatch, id, placeId]);

    return (
        <TableRow className={classes.root}>
            <TableCell style={{ width: 400 }}>
                <Name
                    menuFileId={id}
                />
            </TableCell>
            <TableCell style={{ width: 200 }}>
                {actualizedAt.length ? moment(actualizedAt).format('DD/MM/YY HH:mm') : ''}
            </TableCell>
            <TableCell style={{ width: 300 }}>
                <Media
                    menuFileId={id}
                />
            </TableCell>
            <TableCell style={{ width: 250, maxWidth: 250 }}>
                <Rubrics
                    menuFileId={id}
                />
            </TableCell>
            <TableCell style={{ width: 100 }}>
                <Button
                    variant="contained"
                    type="button"
                    className={classes.deleteButton}
                    startIcon={<DeleteIcon/>}
                    onClick={handleMenuFileDelete}
                    // disabled={!(name.length || price.length)}
                >
                    Удалить
                </Button>
            </TableCell>
        </TableRow>
    );
};

MenuFile.displayName = 'MenuFile';

MenuFile.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    placeId: PropTypes.number.isRequired
};

export default MenuFile;