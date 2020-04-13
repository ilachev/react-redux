import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import {
    Actions,
    AverageBill,
    ChosenMenu,
    Cuisine,
    Features,
    History,
    MenuFiles,
    Name,
    Phones,
    Photos,
    PlaceType,
    WorkTime
} from "../../../../../../../components/Actualization/Details/components/Results/components/Place/components";
import { useSelector } from "react-redux";

const Place = props => {
    const { className, id, ...rest } = props;

    const place = useSelector(state => state.project.placesEntities.getIn(['places', id]));

    return useMemo(() => (
        <TableRow
            {...rest}
            hover
        >
            <TableCell>{id}</TableCell>
            <Name
                placeId={id}
            />
            <Phones
                placeId={id}
            />
            <WorkTime
                placeId={id}
            />
            <Features
                placeId={id}
            />
            <Photos 
                placeId={id}
            />
            <ChosenMenu
                placeId={id}
            />
            <MenuFiles
                placeId={id}
            />
            <PlaceType
                placeId={id}
            />
            <AverageBill
                placeId={id}
            />
            <Cuisine
                placeId={id}
            />
            <TableCell>
                {
                    place.comment.text !== undefined && place.comment.text.length > 0 &&
                    `${place.comment.date}, ${place.comment.nickname} (${place.comment.email}) ${place.comment.text}`
                }
            </TableCell>
            <History
                placeId={id}
            />
            <Actions
                placeId={id}
            />
        </TableRow>
    ),[id, place.comment, rest]);
};

Place.propTypes = {
    className: PropTypes.string
};

export default Place;