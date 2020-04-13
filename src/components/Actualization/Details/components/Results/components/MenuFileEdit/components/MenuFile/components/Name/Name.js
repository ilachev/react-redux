import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { TextField } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { editMenuFileName } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
}));

const Name = props => {
    const { menuFileId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const name = useSelector(state => state.project.placesEntities.getIn(['menuFiles', menuFileId, 'name'], ''));
    const menuFileErrors = useSelector(state => state.project.errors.menu_files[menuFileId]);

    const handleMenuFileNameEdit = useCallback((event) => {
        event.persist();
        dispatch(editMenuFileName(menuFileId, event.target.value))
    }, [dispatch, menuFileId]);

    return (
        <div className={classes.root}>
            <TextField
                {...rest}
                fullWidth
                label="Название"
                name="menuFileName"
                margin="dense"
                value={name}
                variant="outlined"
                onChange={handleMenuFileNameEdit}
                error={!!(menuFileErrors && menuFileErrors.name)}
                helperText={menuFileErrors && menuFileErrors.name ? menuFileErrors.name : ''}
            />
        </div>
    );
};

Name.propTypes = {
    menuFileId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired
};

export default Name;