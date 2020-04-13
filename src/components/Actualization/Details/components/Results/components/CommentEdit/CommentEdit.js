import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, Card, CardActions, CardContent, colors, Grid, Modal, TextField } from '@material-ui/core';
import { placeComment, toggleCommentEdit } from "../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        boxShadow: theme.shadows[20],
        width: 350,
        maxHeight: '100%',
        overflowY: 'auto',
        maxWidth: '100%'
    },
    actions: {
        justifyContent: 'flex-end'
    },
    saveButton: {
        color: theme.palette.white,
        backgroundColor: colors.green[600],
        '&:hover': {
            backgroundColor: colors.green[900]
        }
    }
}));

const CommentEdit = props => {
    const { className, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const open = useSelector(state => state.project.isCommentEditOpen);
    const placeId = useSelector(state => state.project.activePlaceId);
    const comment = useSelector(state => state.project.placesEntities.getIn(['places', placeId, 'comment', 'text'], ''));
    const [commentState, setCommentState] = useState(comment);
    const { id, slug } = useParams();

    const handleCommentEdit = useCallback(() => {
        dispatch(placeComment(slug, id, placeId, commentState));
        dispatch(toggleCommentEdit(false));
    }, [dispatch, slug, id, placeId, commentState]);

    const handleCommentEditClose = useCallback(() => {
        dispatch(toggleCommentEdit(false));
    }, [dispatch]);

    useEffect(() => {
        setCommentState(comment);
    }, [comment]);

    if (!open) {
        return null;
    }

    const handleFieldChange = event => {
        event.persist();
        setCommentState(event.target.value);
    };

    return (
        <Modal
            onClose={handleCommentEditClose}
            open={open}
        >
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
                <CardContent className={classes.scrollbar}>
                    <Grid
                        className={classes.container}
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={12}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                label="Комментарий"
                                name="comment"
                                onChange={handleFieldChange}
                                value={commentState}
                                variant="outlined"
                                multiline
                                rows={5}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button
                        onClick={handleCommentEditClose}
                        variant="contained"
                        type="button"
                    >
                        Закрыть
                    </Button>
                    <Button
                        className={classes.saveButton}
                        onClick={handleCommentEdit}
                        variant="contained"
                        type="button"
                    >
                        Сохранить
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    );
};

CommentEdit.displayName = 'CommentEdit';

CommentEdit.propTypes = {
    className: PropTypes.string
};

export default CommentEdit;