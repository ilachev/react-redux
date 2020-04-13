import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Button, Grid, List, ListItem, ListItemText, TableCell } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { toggleWorkTimeEdit, setActivePlaceId } from "../../../../../../../../../actions";

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 170,
        lineHeight: '1.7rem',
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(1),
        },
    },
    gridItem: {
        padding: theme.spacing(0)
    },
    title: {
        margin: theme.spacing(0),
    },
    list: {
        padding: theme.spacing(0)
    },
    listItem: {
        padding: theme.spacing(0)
    },
    workTime: {
        whiteSpace: 'nowrap'
    },
    buttonIcon: {
        marginRight: theme.spacing(1),
        fontSize: '2rem'
    },
}));

const WorkTime = props => {
    const { placeId, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const viewWorkTimes = useSelector(
        state => state.project.placesEntities
            .getIn(['places', placeId, 'view_work_times'], {})
    );

    const handleWorkTimeEditOpen = useCallback(() => {
        dispatch(setActivePlaceId(placeId));
        dispatch(toggleWorkTimeEdit(true));
    }, [dispatch, placeId]);

    return (
        <TableCell
            {...rest}
            className={classes.root}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} className={classes.gridItem}>
                    <div>
                        <List dense className={classes.list}>
                            {
                                Object.keys(viewWorkTimes).map((key, index) => {
                                    return (
                                        <ListItem key={index} className={classes.listItem}>
                                            <ListItemText
                                                disableTypography
                                                primary={<span
                                                    className={classes.workTime}
                                                    dangerouslySetInnerHTML={{ __html: `${key}: ${viewWorkTimes[key]}` }}
                                                />}
                                            />
                                        </ListItem>
                                    );
                                })
                            }
                        </List>
                    </div>
                </Grid>
            </Grid>
            <Button
                color="primary"
                type="button"
                variant="contained"
                size="small"
                onClick={handleWorkTimeEditOpen}
            >
                <ScheduleIcon className={classes.buttonIcon}/>
                Редактировать
            </Button>
        </TableCell>
    );
};

WorkTime.propTypes = {
    placeId: PropTypes.number.isRequired,
};

export default WorkTime;