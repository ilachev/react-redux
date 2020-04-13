import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, ListItem, ListItemText, TableCell } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import KitchenIcon from '@material-ui/icons/Kitchen';
import { setActivePlaceId, toggleCuisineEdit } from "../../../../../../../../../actions";

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
    list: {
        padding: theme.spacing(0),
        marginBottom: theme.spacing(1),
    },
    cuisine: {
        whiteSpace: 'pre-wrap'
    }
}));

const Cuisine = props => {
    const { placeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const [cuisineNames, setCuisineNames] = useState([]);

    const cuisines = useSelector(state => state.project.placesEntities.getIn(['cuisines'], {}));
    const cuisineIds = useSelector(state => state.project.placesEntities.getIn(['places', placeId, 'cuisines'], []));

    const handleCuisineEditOpen = useCallback(() => {
        dispatch(setActivePlaceId(placeId));
        dispatch(toggleCuisineEdit(true));
    }, [dispatch, placeId]);

    useEffect(() => {
        let active = true;
        if (!Object.keys(cuisines).length) {
            return undefined;
        }
        if (active) {
            setCuisineNames(
                cuisineIds
                    .map(typeId => cuisines[typeId].cuisine ? cuisines[typeId].cuisine.name : undefined)
                    .filter(x => x)
            );
        }
        return () => {
            active = false;
        }
    }, [cuisineIds, cuisines]);

    return (
        <TableCell
            {...rest}
            style={{ maxWidth: 200 }}
            className={classes.root}
        >
            {
                cuisineNames.length > 0 &&
                <div>
                    {
                        cuisineNames.map((name, index) => {
                            return (
                                <ListItem className={classes.list}>
                                    <ListItemText
                                        disableTypography
                                        primary={<span
                                            className={classes.cuisine}
                                            dangerouslySetInnerHTML={{
                                                __html: `${name}`
                                            }}
                                        />}
                                    />
                                </ListItem>
                            );
                        })
                    }
                </div>
            }
            <Button
                color="primary"
                type="button"
                variant="contained"
                size="small"
                fullWidth
                onClick={handleCuisineEditOpen}
            >
                <KitchenIcon className={classes.buttonIcon}/>
                Редактировать
            </Button>
        </TableCell>
    );
};

Cuisine.propTypes = {
    placeId: PropTypes.number.isRequired
};

export default Cuisine;