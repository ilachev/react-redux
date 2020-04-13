import React, { useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import clsx from 'clsx';
import PropTypes from 'prop-types';
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
    TableRow,
    Typography
} from '@material-ui/core';
import { addCuisine, changeCuisinePosition, toggleCuisineEdit } from "../../../../../../../actions";
import PerfectScrollbar from "react-perfect-scrollbar";
import { PlaceCuisine } from "./components";
import AddIcon from '@material-ui/icons/Add';
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        outline: 'none',
        boxShadow: theme.shadows[20],
        width: 620,
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
    row: {
        '& > *': {
            padding: theme.spacing(1),
            verticalAlign: 'middle'
        }
    },
    actions: {
        justifyContent: 'flex-end',
        position: 'sticky',
        bottom: 0,
        backgroundColor: theme.palette.white,
    },
    addButton: {
        color: theme.palette.white,
        backgroundColor: colors.green[600],
        '&:hover': {
            backgroundColor: colors.green[900]
        }
    }
}));

const SortableItem = SortableElement(({cuisineId, placeId}) => {
    return (
        <PlaceCuisine
            id={cuisineId}
            placeId={placeId}
        />
    );
});

const SortableList = SortableContainer(({cuisineIds, placeId}) => {
    return (
        <TableBody>
            {
                cuisineIds.map((id, index) => {
                    return (
                        <SortableItem
                            key={id}
                            index={index}
                            cuisineId={id}
                            placeId={placeId}
                        />
                    );
                })
            }
        </TableBody>
    );
});

const CuisineEdit = props => {
    const { className, ...rest } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const placeId = useSelector(state => state.project.activePlaceId);
    const open = useSelector(state => state.project.isCuisineEditOpen);
    const cuisineIds = useSelector(
        state => state.project.placesEntities
            .getIn(['places', placeId, 'cuisines'], [])
    );

    const handleCuisineEditClose = useCallback(() => {
        dispatch(toggleCuisineEdit(false));
    }, [dispatch]);

    const handleCuisineAdd = useCallback(() => {
        dispatch(addCuisine(placeId));
    }, [dispatch, placeId]);

    const handleOnSortEnd = useCallback(({oldIndex, newIndex}) => {
        dispatch(changeCuisinePosition(placeId, oldIndex, newIndex));
    }, [dispatch, placeId]);

    if (!open) {
        return null;
    }

    return (
        <Modal
            onClose={handleCuisineEditClose}
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
                                Тип заведения
                            </Typography>
                            <TableContainer className={classes.container}>
                                <Table>
                                    <TableHead>
                                        <TableRow className={classes.row}>
                                            <TableCell style={{ width: 300, maxWidth: 300 }}>Кухня</TableCell>
                                            <TableCell style={{ width: 100 }}>Действия</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <SortableList
                                        cuisineIds={cuisineIds}
                                        placeId={placeId}
                                        axis={`y`}
                                        onSortEnd={handleOnSortEnd}
                                        distance={1} />

                                </Table>
                            </TableContainer>
                        </div>
                    </PerfectScrollbar>
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button
                        onClick={handleCuisineEditClose}
                        variant="contained"
                        type="button"
                    >
                        Закрыть
                    </Button>
                    <Button
                        className={classes.addButton}
                        onClick={handleCuisineAdd}
                        variant="contained"
                        type="button"
                        startIcon={<AddIcon />}
                    >
                        Добавить
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    );
};

CuisineEdit.displayName = 'CuisineEdit';

CuisineEdit.propTypes = {
    className: PropTypes.string
};

export default CuisineEdit;