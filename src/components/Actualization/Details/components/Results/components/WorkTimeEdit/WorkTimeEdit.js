import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    colors,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from '@material-ui/core';
import { toggleWorkTimeEdit } from "../../../../../../../actions";
import PerfectScrollbar from "react-perfect-scrollbar";
import { WorkTime, PlaceOpenTime, PlaceCloseTime } from "./components";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        boxShadow: theme.shadows[20],
        width: 1070,
        maxHeight: '100%',
        overflowY: 'auto',
        maxWidth: '100%'
    },
    scrollbar: {
        '& > *:not(:last-child)': {
            marginBottom: theme.spacing(2),
        },
    },
    title: {
        flex: '1 1 100%',
    },
    actions: {
        justifyContent: 'flex-end'
    },
    saveButton: {
        color: theme.palette.white,
        backgroundColor: colors.green[600],
        '&:hover': {
            backgroundColor: colors.green[900]
        }
    },
    row: {
        '& > *': {
            padding: theme.spacing(1),
            verticalAlign: 'middle'
        },
    }
}));

const WorkTimeEdit = props => {
    const { className, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const open = useSelector(state => state.project.isWorkTimeEditOpen);
    const placeId = useSelector(state => state.project.activePlaceId);
    const workTimeIds = useSelector(state => state.project.placesEntities.getIn(['places', placeId, 'work_time']));

    const handleWorkTimeEditClose = useCallback(() => {
        dispatch(toggleWorkTimeEdit(false));
    }, [dispatch]);

    if (!open) {
        return null;
    }

    return (
        <Modal
            onClose={handleWorkTimeEditClose}
            open={open}
        >
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
                <CardContent>
                    <PerfectScrollbar>
                        <div className={classes.scrollbar}>
                            <Typography className={classes.title} variant="h6">
                                Часы работы
                            </Typography>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow className={classes.row}>
                                            <TableCell>День недели</TableCell>
                                            <TableCell style={{minWidth: 140}}>Время открытия</TableCell>
                                            <TableCell style={{minWidth: 140}}>Время закрытия</TableCell>
                                            <TableCell>Выходной</TableCell>
                                            <TableCell>До последнего клиента</TableCell>
                                            <TableCell>Под заказ</TableCell>
                                            <TableCell style={{minWidth: 140}}>Время открытия кухни</TableCell>
                                            <TableCell style={{minWidth: 140}}>Время закрытия кухни</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow className={classes.row}>
                                            <TableCell>Для всех дней</TableCell>
                                            <PlaceOpenTime
                                                placeId={placeId}
                                            />
                                            <PlaceCloseTime
                                                placeId={placeId}
                                            />
                                            <TableCell colSpan={5}/>
                                        </TableRow>
                                        {
                                            workTimeIds.map(id => {
                                                return (
                                                    <WorkTime
                                                        key={id}
                                                        id={id}
                                                    />
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </PerfectScrollbar>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button
                        onClick={handleWorkTimeEditClose}
                        variant="contained"
                        type="button"
                    >
                        Закрыть
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    );
};

WorkTimeEdit.displayName = 'WorkTimeEdit';

WorkTimeEdit.propTypes = {
    className: PropTypes.string
};

export default WorkTimeEdit;