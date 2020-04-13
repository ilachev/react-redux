import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Card, CardActions, CardContent, Menu, MenuItem, Modal, Typography } from '@material-ui/core';
import { deselectAllPhoto, selectAllPhoto, togglePhotosEdit, deleteSelectedPhotos } from "../../../../../../../actions";
import { Photos, Dropzone } from "./components";
import PerfectScrollbar from "react-perfect-scrollbar";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        boxShadow: theme.shadows[20],
        width: 670,
        maxHeight: '100%',
        overflowY: 'auto',
        maxWidth: '100%'
    },
    scrollbar: {
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(2),
        },
    },
    title: {
        flex: '1 1 100%',
    },
    actions: {
        justifyContent: 'space-between'
    },
    subActions: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
        '& > *:not(:first-child)': {
            marginLeft: theme.spacing(1),
        },
    },
    deleteButton: {
        color: theme.palette.white,
        backgroundColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: theme.palette.error.dark
        }
    },
    row: {
        '& > *': {
            padding: theme.spacing(1),
            verticalAlign: 'middle'
        },
    }
}));

const usePhotoSelectStatus = placeId => {
    const [isAnyPhotoSelected, setIsAnyPhotoSelected] = useState(false);
    const photoIds = useSelector(state => state.project.placesEntities.getIn(['places', placeId, 'photos'], []));
    const photos = useSelector(state => state.project.placesEntities)
        .getIn(['photos'], {});

    const selectedPhotos = Object.keys(photos)
        // eslint-disable-next-line
        .filter(photoId => photoIds.find(el => el == photoId))
        .filter(photoId => photos[photoId].select === true);

    useEffect(() => {
        setIsAnyPhotoSelected(!!selectedPhotos.length)
    }, [selectedPhotos.length]);

    return isAnyPhotoSelected;
};

const PhotosEdit = props => {
    const { className, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = useSelector(state => state.project.isPhotosEditOpen);
    const placeId = useSelector(state => state.project.activePlaceId);
    const isAnyPhotoSelected = usePhotoSelectStatus(placeId);

    const handlePhotosEditClose = useCallback(() => {
        dispatch(togglePhotosEdit(false));
    }, [dispatch]);

    const handleSelectAllPhoto = useCallback(() => {
        setAnchorEl(null);
        dispatch(selectAllPhoto(placeId));
    }, [dispatch, placeId]);

    const handleDeselectAllPhoto = useCallback(() => {
        setAnchorEl(null);
        dispatch(deselectAllPhoto(placeId));
    }, [dispatch, placeId]);

    const handleDeleteSelectedPhotos = useCallback(() => {
        dispatch(deleteSelectedPhotos(placeId));
    }, [dispatch, placeId]);

    if (!open) {
        return null;
    }

    return (
        <Modal
            onClose={handlePhotosEditClose}
            open={open}
        >
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
                <CardContent>
                    <PerfectScrollbar>
                        <div className={classes.scrollbar}>
                            <Typography className={classes.title} variant="h6">
                                Фотографии заведения
                            </Typography>
                            <Photos />
                            <Dropzone />
                        </div>
                    </PerfectScrollbar>
                </CardContent>
                <CardActions className={classes.actions}>
                    {
                        isAnyPhotoSelected &&
                        <Button
                            variant="contained"
                            type="button"
                            className={classes.deleteButton}
                            startIcon={<DeleteIcon/>}
                            onClick={handleDeleteSelectedPhotos}
                        >
                            Удалить
                        </Button>
                    }
                    <div className={classes.subActions}>
                        <Button
                            onClick={handlePhotosEditClose}
                            variant="contained"
                            type="button"
                        >
                            Закрыть
                        </Button>
                        <Button
                            variant="contained"
                            type="button"
                            color="primary"
                            startIcon={<ArrowDropDownIcon/>}
                            onClick={handleOpen}
                        >
                            Выбрать
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleSelectAllPhoto}>Все</MenuItem>
                            <MenuItem onClick={handleDeselectAllPhoto}>Ни одного</MenuItem>
                        </Menu>
                    </div>
                </CardActions>
            </Card>
        </Modal>
    );
};

export default PhotosEdit;