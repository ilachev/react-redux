import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from "react-redux";
import { Button, Link, Typography } from "@material-ui/core";
import { uploadMedia } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'start'
    },
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        display: 'none !important',
    },
    label: {
        margin: 0,
    },
    button: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(0),
        marginBottom: theme.spacing(0),
        maxWidth: 80
    },
    errorButton: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(0),
        marginBottom: theme.spacing(0),
        maxWidth: 80,
        border: `1px solid ${theme.palette.error.main}`
    },
    errorText: {
        color: theme.palette.error.main,
        fontSize: '11px'
    },
    link: {
        maxWidth: 100,
        wordBreak: 'break-word'
    }
}));

const Media = props => {
    const { menuFileId } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const media = useSelector(state => state.project.placesEntities.getIn(['menuFiles', menuFileId, 'media'], {}));
    const menuFileErrors = useSelector(state => state.project.errors.menu_files[menuFileId]);

    const handleMediaChange = useCallback(event => {
        event.persist && event.persist();
        dispatch(uploadMedia(menuFileId, event.target.files[0]));
    }, [dispatch, menuFileId]);

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <input
                    className={classes.input}
                    id={`menu-file-${menuFileId}`}
                    type="file"
                    onChange={handleMediaChange}
                />
                <label htmlFor={`menu-file-${menuFileId}`} className={classes.label}>
                    <Button
                        variant="outlined"
                        color="default"
                        component="span"
                        className={menuFileErrors && menuFileErrors.media ? classes.errorButton : classes.button}
                    >
                        Обзор
                    </Button>
                </label>
                {
                    media.path && media.name &&
                    <Link
                        href={media.path}
                        target="_blank"
                        variant="h6"
                        className={classes.link}
                    >
                        {media.name}
                    </Link>
                }
                {
                    !media.path && media.name &&
                    <Typography
                        variant="h6"
                        className={classes.link}
                    >
                        {media.name}
                    </Typography>
                }
            </div>

            {
                menuFileErrors && menuFileErrors.media &&
                <Typography className={classes.errorText}>
                    {menuFileErrors.media}
                </Typography>
            }

        </div>
    );
};

Media.propTypes = {
    menuFileId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default Media;