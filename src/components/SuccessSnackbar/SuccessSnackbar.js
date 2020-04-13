import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Snackbar, SnackbarContent, colors } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';
import { toggleSuccessSnackbar } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
    content: {
        backgroundColor: colors.green[600]
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: theme.spacing(2)
    }
}));

const SuccessSnackbar = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const isSnackbarOpen = useSelector(state => state.project.isSuccessSnackbarOpen);
    const snackbarMessage = useSelector(state => state.project.snackbarMessage);

    const handleSnackbarClose = useCallback(() => {
        dispatch(toggleSuccessSnackbar(false));
    }, [dispatch]);

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            open={isSnackbarOpen}
        >
            <SnackbarContent
                className={classes.content}
                message={
                    <span className={classes.message}>
                        <CheckCircleIcon className={classes.icon} />
                        {snackbarMessage}
                    </span>
                }
                variant="h6"
            />
        </Snackbar>
    );
};

export default SuccessSnackbar;