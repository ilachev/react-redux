import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Modal,
} from '@material-ui/core';
import { togglePhotoDetail } from "../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        boxShadow: theme.shadows[20],
        width: 1070,
        maxHeight: '100%',
        overflowY: 'auto',
        maxWidth: '100%'
    },
    actions: {
        justifyContent: 'flex-end'
    },
    row: {
        '& > *': {
            padding: theme.spacing(1),
            verticalAlign: 'middle'
        },
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

const PhotoDetail = props => {
    const { className, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const open = useSelector(state => state.project.isPhotoDetailOpen);
    const photoId = useSelector(state => state.project.activePhotoId);
    const photo = useSelector(state => state.project.placesEntities.getIn(['photos', photoId]));

    const handlePhotoDetailClose = useCallback(() => {
        dispatch(togglePhotoDetail(false));
    }, [dispatch]);

    if (!open) {
        return null;
    }

    return (
        <Modal
            onClose={handlePhotoDetailClose}
            open={open}
        >
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
                <CardContent>
                    <CardMedia
                        className={classes.media}
                        image={photo.src.big}
                        title={photo.name}
                    />
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button
                        onClick={handlePhotoDetailClose}
                        variant="contained"
                        type="button"
                    >
                        Закрыть
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    );
};

export default PhotoDetail;