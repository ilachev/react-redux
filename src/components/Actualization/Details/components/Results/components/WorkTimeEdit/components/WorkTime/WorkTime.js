import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    TableCell,
    TableRow
} from '@material-ui/core';
import { useSelector } from "react-redux";
import { weekDayTransformer } from "../../../../../../../../../utils";
import { makeStyles } from "@material-ui/styles";
import { 
    OpenTime, 
    CloseTime, 
    KitchenOpenTime, 
    KitchenCloseTime, 
    DayOff, 
    LastClient, 
    OnRequest 
} from "./components";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            padding: theme.spacing(1),
            verticalAlign: 'middle'
        },
    },
    checkbox: {
        padding: 3
    },
}));

const WorkTime = props => {
    const { id, ...rest } = props;
    const classes = useStyles();

    const workTime = useSelector(state => state.project.placesEntities.getIn(['workTime', id]));
    const weekDay = weekDayTransformer(workTime.weekDay);

    return useMemo(() => (
        <TableRow
            {...rest}
            className={classes.root}
            hover
        >
            <TableCell>{weekDay}</TableCell>
            <OpenTime
                workTimeId={id}
            />
            <CloseTime
                workTimeId={id}
            />
            <DayOff
                workTimeId={id}
            />
            <LastClient 
                workTimeId={id}
            />
            <OnRequest 
                workTimeId={id}
            />
            <KitchenOpenTime
                workTimeId={id}
            />
            <KitchenCloseTime
                workTimeId={id}
            />
        </TableRow>
    ),[classes.root, id, rest, weekDay]);
};

WorkTime.propTypes = {
    id: PropTypes.number.isRequired
};

export default WorkTime;