import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Checkbox,
    GridListTile,
    GridListTileBar
} from "@material-ui/core";
import { setActivePhotoId, toggleSelectPhoto, togglePhotoDetail } from "../../../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        width: 202,
        height: 202,
        padding: theme.spacing(0.25),
        listStyle: 'none',
        zIndex: 1400,
    },
    titleBar: {
        backgroundColor: theme.palette.black
    },
    img: {
        cursor: 'pointer'
    },
    icon: {
        color: 'white',
    },
    checkbox: {
        color: theme.palette.white,
        '&$checked': {
            color: theme.palette.white,
        },
    }
}));

const Photo = props => {
    const { id } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const photo = useSelector(state => state.project.placesEntities.getIn(['photos', id]));
    const select = useSelector(state => state.project.placesEntities.getIn(['photos', id, 'select']));

    const handlePhotoDetailOpen = useCallback(() => {
        dispatch(setActivePhotoId(id));
        dispatch(togglePhotoDetail(true));
    }, [dispatch, id]);

    const handleTogglePhotoSelect = useCallback((event) => {
        dispatch(toggleSelectPhoto(id, event.target.checked))
    }, [dispatch, id]);

    return (
        <GridListTile className={classes.root} cols={2} rows={1}>
            <img
                className={classes.img}
                src={photo.src.small}
                alt={photo.name}
                onClick={handlePhotoDetailOpen}
            />
            <GridListTileBar
                title={photo.name}
                titlePosition="bottom"
                actionIcon={
                    <Checkbox
                        className={classes.checkbox}
                        checked={select}
                        value={select}
                        onChange={handleTogglePhotoSelect}
                        color="default"
                    />
                }
                actionPosition="left"
                className={classes.titleBar}
            />
        </GridListTile>
    );
};

Photo.propTypes = {
    className: PropTypes.string
};

export default Photo;