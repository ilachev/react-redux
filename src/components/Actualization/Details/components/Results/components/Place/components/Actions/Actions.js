/* global Routing */

import React, { useCallback } from 'react';
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, TableCell } from '@material-ui/core';
import SaveIcon from "@material-ui/icons/Save";
import CommentIcon from "@material-ui/icons/Comment";
import EditIcon from "@material-ui/icons/Edit";
import { toggleCommentEdit, setActivePlaceId, placeUpdate } from "../../../../../../../../../actions";
import { useParams } from "react-router";

const useStyles = makeStyles(theme => ({
    root: {
        width: 100,
        lineHeight: '1.7rem',
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(1),
        },
    },
    buttonIcon: {
        marginRight: theme.spacing(1),
        fontSize: '2rem'
    },
    saveButton: {
        color: theme.palette.white,
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: theme.palette.success.dark
        }
    }
}));

const Actions = props => {
    const { placeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const { id, slug } = useParams();

    const handleCommentEditOpen = useCallback(() => {
        dispatch(setActivePlaceId(placeId));
        dispatch(toggleCommentEdit(true));
    }, [dispatch, placeId]);

    const handlePlaceUpdate = useCallback(() => {
        dispatch(placeUpdate(slug, id, placeId));
    }, [dispatch, slug, id, placeId]);

    return (
        <TableCell
            {...rest}
            className={classes.root}
        >
            <Button
                color="primary"
                type="button"
                variant="contained"
                size="small"
                fullWidth
                className={classes.saveButton}
                onClick={handlePlaceUpdate}
            >
                <SaveIcon className={classes.buttonIcon}/>
                Сохранить
            </Button>
            <Button
                color="primary"
                type="button"
                variant="contained"
                size="small"
                fullWidth
                onClick={handleCommentEditOpen}
            >
                <CommentIcon className={classes.buttonIcon}/>
                Комментарий
            </Button>
            <Button
                href={Routing.generate(`admin_restoclub_catalogue_place_edit`, { id: placeId })}
                target="_blank"
                color="primary"
                type="button"
                variant="outlined"
                size="small"
                fullWidth
            >
                <EditIcon className={classes.buttonIcon}/>
                Редактировать в админке
            </Button>
        </TableCell>
    );
};

Actions.propTypes = {
    placeId: PropTypes.number.isRequired,
};

export default Actions;