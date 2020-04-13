import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { GridList } from "@material-ui/core";
import { Photo } from "./components";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { changePhotoPosition } from "../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 800,
        maxHeight: 500,
        transform: 'translateZ(0)',
    },
}));

const SortableItem = SortableElement(({photoId}) => {
    return (
        <Photo
            id={photoId}
        />
    );
});

const SortableList = SortableContainer(({photoIds}) => {
    const classes = useStyles();
    return (
        <GridList
            className={classes.gridList}
            cellHeight={200}
            spacing={1}
        >
            {photoIds.map((photoId, index) => (
                <SortableItem
                    key={`item-${photoId}`}
                    index={index}
                    photoId={photoId}
                />
            ))}
        </GridList>
    );
});

const Photos = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const placeId = useSelector(state => state.project.activePlaceId);
    const photoIds = useSelector(state => state.project.placesEntities.getIn(['places', placeId, 'photos']));
    const handleOnSortEnd = useCallback(({oldIndex, newIndex}) => {
        dispatch(changePhotoPosition(placeId, oldIndex, newIndex));
    }, [dispatch, placeId]);

    return (
        <div className={classes.root}>
            <SortableList
                photoIds={photoIds}
                axis={`xy`}
                onSortEnd={handleOnSortEnd}
                distance={1} />
        </div>
    );
};

Photos.propTypes = {
    className: PropTypes.string
};

export default Photos;