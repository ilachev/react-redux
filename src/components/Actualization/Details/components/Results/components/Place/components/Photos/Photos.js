import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, TableCell } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { togglePhotosEdit, setActivePlaceId } from "../../../../../../../../../actions";
import pluralize from "../../../../../../../../../utils/pluralize";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 170,
        whiteSpace: 'nowrap',
        lineHeight: '1.7rem',
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(1),
        },
    },
    buttonIcon: {
        marginRight: theme.spacing(1),
        fontSize: '2rem'
    },
}));

const Photos = props => {
    const { placeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const photoIds = useSelector(
        state => state.project.placesEntities
            .getIn(['places', placeId, 'photos'], [])
    );
    const handlePhotosEditOpen = useCallback(() => {
        dispatch(setActivePlaceId(placeId));
        dispatch(togglePhotosEdit(true));
    }, [dispatch, placeId]);

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
                onClick={handlePhotosEditOpen}
            >
                <ImageIcon className={classes.buttonIcon}/>
                {
                    photoIds &&
                    pluralize(photoIds.length, ['фотография', 'фотографии', 'фотографий'])
                }
            </Button>
        </TableCell>
    );
};

Photos.propTypes = {
    placeId: PropTypes.number.isRequired,
};

export default Photos;