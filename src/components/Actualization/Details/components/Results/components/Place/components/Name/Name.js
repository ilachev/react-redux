/* global Routing */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Chip,
    Link,
    TableCell,
    Typography
} from '@material-ui/core';
import { useSelector } from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {},
    nameCell: {
        display: 'flex',
        flexFlow: 'column'
    },
    chips: {
        marginTop: theme.spacing(0.5),
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    greenChip: {
        color: theme.palette.black,
        backgroundColor: theme.palette.success.ease
    },
    redChip: {
        color: theme.palette.black,
        backgroundColor: theme.palette.error.ease
    }
}));

const Name = props => {
    const { placeId, ...rest } = props;

    const place = useSelector(state => state.project.placesEntities.getIn(['places', placeId]));

    const classes = useStyles();

    return (
        <TableCell
            {...rest}
        >
            <div className={classes.nameCell}>
                <Typography
                    component="span"
                >
                    <Link
                        href={Routing.generate(`restoclub_catalogue_item_view`, { _city: place.city_slug, slug: place.slug })}
                        target="_blank"
                        variant="h6"
                    >
                        {place.name}
                    </Link>

                    <Typography
                        component="span"
                    >
                        {`, ${place.city}, ${place.street} ${place.house}`}
                    </Typography>
                </Typography>

                <div className={classes.chips}>
                    <Chip
                        className={place.active ? classes.greenChip : classes.redChip}
                        size="small"
                        label={place.active ? 'Активно' : 'Не активно'}
                    />
                    <Chip
                        className={place.closed ? classes.redChip : classes.greenChip}
                        size="small"
                        label={place.closed ? 'Закрыто' : 'Открыто'}
                    />
                    <Chip
                        className={classes.greenChip}
                        size="small"
                        label={place.premium ? 'Платный' : 'Бесплатный'}
                    />
                </div>
            </div>

        </TableCell>
    );
};

Name.propTypes = {
    placeId: PropTypes.number.isRequired
};

export default Name;