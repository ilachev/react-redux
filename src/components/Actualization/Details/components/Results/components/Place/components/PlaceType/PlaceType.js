import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, TableCell, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { setActivePlaceId, togglePlaceTypeEdit } from "../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(1),
        },
    },
    buttonIcon: {
        marginRight: theme.spacing(1),
        fontSize: '2rem'
    },
}));

const PlaceType = props => {
    const { placeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const [placeTypeNames, setPlaceTypeNames] = useState('');

    const placeTypes = useSelector(state => state.project.placesEntities.getIn(['placeTypes'], {}));
    const placeTypeIds = useSelector(state => state.project.placesEntities.getIn(['places', placeId, 'place_types'], []));

    const handlePlaceTypeEditOpen = useCallback(() => {
        dispatch(setActivePlaceId(placeId));
        dispatch(togglePlaceTypeEdit(true));
    }, [dispatch, placeId]);

    useEffect(() => {
        let active = true;
        if (!Object.keys(placeTypes).length) {
            return undefined;
        }
        if (active) {
            setPlaceTypeNames(
                placeTypeIds
                    .map(typeId => placeTypes[typeId].type ? placeTypes[typeId].type.name : undefined)
                    .filter(x => x)
                    .join(', ')
            );
        }
        return () => {
            active = false;
        }
    }, [placeTypeIds, placeTypes]);

    return (
        <TableCell
            {...rest}
            style={{ maxWidth: 200 }}
            className={classes.root}
        >
            {
                placeTypeNames.length > 0 &&
                <div>
                    <Typography
                        component="span"
                    >
                        {placeTypeNames}
                    </Typography>
                </div>
            }
            <Button
                color="primary"
                type="button"
                variant="contained"
                size="small"
                fullWidth
                onClick={handlePlaceTypeEditOpen}
            >
                <RestaurantIcon className={classes.buttonIcon}/>
                Редактировать
            </Button>
        </TableCell>
    );
};

PlaceType.propTypes = {
    placeId: PropTypes.number.isRequired
};

export default PlaceType;