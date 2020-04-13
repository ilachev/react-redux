import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableRow } from '@material-ui/core';
import {
    Actions,
    History,
    MenuFiles,
    Name,
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
            <MenuFiles
                placeId={id}
            />
            <PlaceType
                placeId={id}
            />
            <WorkTime
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