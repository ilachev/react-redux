import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/styles';
import {
    Link,
    Typography,
    colors
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { uploadPhotos } from "../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {},
    dropZone: {
        border: `1px dashed ${theme.palette.divider}`,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(-3),
        outline: 'none',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: colors.grey[50],
            opacity: 0.5,
            cursor: 'pointer'
        }
    },
    dragActive: {
        backgroundColor: colors.grey[50],
        opacity: 0.5
    },
    upload: {
        width: 100,
        fontSize: 50
    },
    info: {
        marginTop: theme.spacing(1)
    },
    list: {
        maxHeight: 320
    },
    actions: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-end',
        '& > * + *': {
            marginLeft: theme.spacing(2)
        }
    }
}));

const Dropzone = props => {
    const { className, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const placeId = useSelector(state => state.project.activePlaceId);

    const handleDrop = useCallback(acceptedFiles => {
        dispatch(uploadPhotos(placeId, acceptedFiles));
    }, [dispatch, placeId]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/*'
    });

    return (
        <div
            {...rest}
            className={clsx(classes.root, className)}
        >
            <div
                className={clsx({
                    [classes.dropZone]: true,
                    [classes.dragActive]: isDragActive
                })}
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <div>
                    <CloudUploadIcon className={classes.upload} />
                </div>
                <div>
                    <Typography
                        gutterBottom
                        variant="h3"
                    >
                        Выберите фото
                    </Typography>
                    <Typography
                        className={classes.info}
                        color="textSecondary"
                        variant="body1"
                    >
                        Перетащите файлы сюда или нажмите <Link underline="always">обзор</Link>{' '}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

Dropzone.propTypes = {
    className: PropTypes.string
};

export default Dropzone;